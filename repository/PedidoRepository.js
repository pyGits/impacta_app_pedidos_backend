const Connection = require("./Connection");

class PedidoRepository {
  async getAll(TENANT_ID) {
    return await Connection.select(
      `SELECT 
        p.*,
        c.nome as cliente_nome
      FROM pedido p
      LEFT JOIN cliente c ON c.id = p.cliente_id
      WHERE p.tenant_id = ?
      ORDER BY p.id DESC`,
      [TENANT_ID]
    );
  }

  async getById(id, TENANT_ID) {
    const pedido = await Connection.selectOne(
      `SELECT 
        p.*,
        c.nome as cliente_nome
      FROM pedido p
      LEFT JOIN cliente c ON c.id = p.cliente_id
      WHERE p.id = ? AND p.tenant_id = ?`,
      [id, TENANT_ID]
    );

    if (pedido) {
      pedido.items = await Connection.select(
        `SELECT 
          pi.*,
          pr.nome as produto_nome
        FROM pedido_item pi
        LEFT JOIN produto pr ON pr.id = pi.produto_id
        WHERE pi.pedido_id = ?`,
        [id]
      );
    }

    return pedido;
  }

  async insert(pedido, TENANT_ID) {
    // Format the date to MySQL datetime format
    const mysqlDate = new Date(pedido.data)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Insert main order
    const pedidoParams = [
      pedido.cliente_id,
      mysqlDate,
      pedido.total,
      TENANT_ID,
    ];

    const result = await Connection.insert(
      "INSERT INTO pedido (cliente_id, data, total, tenant_id) VALUES (?, ?, ?, ?)",
      pedidoParams
    );

    const pedidoId = result.insertId; // Pegando o ID correto do resultado

    // Insert order items
    for (const item of pedido.items) {
      const itemParams = [
        pedidoId,
        item.id,
        item.quantidade,
        item.preco_venda,
        item.subtotal,
      ];

      await Connection.insert(
        "INSERT INTO pedido_item (pedido_id, produto_id, quantidade, preco_unitario, subtotal) VALUES (?, ?, ?, ?, ?)",
        itemParams
      );
    }

    return pedidoId;
  }

  async delete(id, TENANT_ID) {
    // Delete items first due to foreign key constraint
    await Connection.delete("DELETE FROM pedido_item WHERE pedido_id = ?", [
      id,
    ]);

    return await Connection.delete(
      "DELETE FROM pedido WHERE id = ? AND tenant_id = ?",
      [id, TENANT_ID]
    );
  }
}

module.exports = new PedidoRepository();
