const TenantRepository = require("../repository/TenantRepository");
const bcrypt = require("bcrypt"); // Certifique-se de importar o bcrypt
const jwt = require("jsonwebtoken"); // Biblioteca para criar tokens JWT

class TenantController {
  async login(req, res) {
    try {
      // Obtem os dados do usuário a partir do corpo da requisição
      const { email, password } = req.body;

      // Busca o usuário no banco de dados
      const user = await TenantRepository.get(email);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      // Verifica se a senha está correta
      console.log(user);
      const isPasswordValid = await bcrypt.compare(password, user.senha);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Senha incorreta." });
      }

      // Gera um token JWT com o ID do usuário e expiração de 1 hora
      const token = jwt.sign({ userId: user.id }, "CHAVE1234", {
        expiresIn: "1h",
      });

      // Retorna o token para o cliente
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao realizar login." });
    }
  }
  async create(req, res) {
    try {
      const { nome, email, senha, confirm_senha } = req.body;

      // Verifica se a senha e a confirmação de senha são iguais
      if (senha !== confirm_senha) {
        return res.status(400).json({ message: "As senhas não coincidem." });
      }

      // Gera um hash da senha
      const hashedPassword = await bcrypt.hash(senha, 10); // 10 é o número de rounds de salting

      // Cria um novo usuário no banco de dados
      const result = await TenantRepository.insert({
        nome,
        email,
        senha: hashedPassword, // Armazena a senha hasheada
      });

      return res.status(201).json({
        message: "Cadastro inserido com sucesso!",
        data: result.insertId,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao criar usuário." });
    }
  }
}
module.exports = new TenantController();
