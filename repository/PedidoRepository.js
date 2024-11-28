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
      `select * from pedido where id = ? and tenant_id = ?`,
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
      pedido.status,
    ];

    const result = await Connection.insert(
      "INSERT INTO pedido (cliente_id, data, total, tenant_id,STATUS) VALUES (?, ?, ?, ?,?)",
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

  async update(pedido, TENANT_ID) {
    const params = [pedido.status, pedido.entregador_id, pedido.id, TENANT_ID];
    return await Connection.update(
      "UPDATE pedido set status = ?, entregador_id = ? where id = ? and tenant_id = ? ",
      params
    );
  }

  async delete(id, TENANT_ID) {
    // Delete items first due to foreign key constraint
    await Connection.delete(
      "DELETE FROM pedido_item WHERE pedido_id = ? and tenant_id = ?",
      [id, TENANT_ID]
    );

    return await Connection.delete(
      "DELETE FROM pedido WHERE id = ? AND tenant_id = ?",
      [id, TENANT_ID]
    );
  }
  async deleteFromProduct(produto_id, TENANT_ID) {
    // Delete items first due to foreign key constraint
    await Connection.delete("DELETE FROM pedido_item WHERE produto_id = ? ", [
      produto_id,
      TENANT_ID,
    ]);
  }
  async getByCliente(tenant_id, id_cliente) {
    return await Connection.select(
      "select * from pedido left join entregador on pedido.entregador_id = entregador.id where cliente_id = ? and pedido.tenant_id = ?",
      [id_cliente, tenant_id]
    );
  }
}

module.exports = new PedidoRepository();
