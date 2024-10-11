const Connection = require("./Connection");

class ClienteRepository {
  async getAll(tenant) {
    return await Connection.select(
      "select * from cliente where tenant_id = ? order by id asc",
      [tenant]
    );
  }

  async delete(id, tenant) {
    return await Connection.delete(
      "delete from cliente where id = ? and tenant_id = ?",
      [id, tenant]
    );
  }

  async insert(cliente, tenant) {
    const params = [
      cliente.nome,
      cliente.cnpjcpf,
      cliente.rgie,
      cliente.telefone,
      cliente.celular,
      cliente.cep,
      cliente.logradouro,
      cliente.cidade,
      cliente.bairro,
      cliente.uf,
      cliente.complemento,
      cliente.numero,
      tenant, // Adicionando o tenant aqui
    ];

    await Connection.insert(
      `insert into cliente 
        (nome, cnpjcpf, rgie, telefone, celular, cep, logradouro, cidade, bairro, uf, complemento, numero, tenant_id) 
        values (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      params
    );
  }

  async update(cliente, tenant) {
    const params = [
      cliente.nome,
      cliente.cnpjcpf,
      cliente.rgie,
      cliente.telefone,
      cliente.celular,
      cliente.cep,
      cliente.logradouro,
      cliente.cidade,
      cliente.bairro,
      cliente.uf,
      cliente.complemento,
      cliente.numero,
      cliente.id, // Certifique-se de que o 'id' está sendo passado para identificar o cliente
      tenant, // Adicionando o tenant aqui
    ];

    await Connection.update(
      `update cliente set 
        nome = ?, 
        cnpjcpf = ?, 
        rgie = ?, 
        telefone = ?, 
        celular = ?, 
        cep = ?, 
        logradouro = ?, 
        cidade = ?, 
        bairro = ?, 
        uf = ?, 
        complemento = ?, 
        numero = ? 
        where id = ? and tenant_id = ?`,
      params
    );
  }

  async getById(id, tenant) {
    let cliente = await Connection.selectOne(
      "select * from cliente where id = ? and tenant_id = ?",
      [id, tenant]
    );

    // Agrupando as informações de endereço em um objeto
    cliente.endereco = {
      cep: cliente.cep,
      logradouro: cliente.logradouro,
      cidade: cliente.cidade,
      bairro: cliente.bairro,
      uf: cliente.uf,
      complemento: cliente.complemento,
      numero: cliente.numero,
    };

    // Removendo os campos originais de endereço do objeto principal
    delete cliente.cep;
    delete cliente.logradouro;
    delete cliente.cidade;
    delete cliente.bairro;
    delete cliente.uf;
    delete cliente.complemento;
    delete cliente.numero;

    return cliente;
  }
}

module.exports = new ClienteRepository();
