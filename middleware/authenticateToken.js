const jwt = require("jsonwebtoken"); // Certifique-se de que o jsonwebtoken esteja instalado

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.sendStatus(401); // Se não houver token, retorna 401 (Unauthorized)
  }

  jwt.verify(token, "CHAVE1234", (err, user) => {
    if (err) {
      return res.sendStatus(403); // Se o token não for válido, retorna 403 (Forbidden)
    }
    req.TENANT_ID = user.userId; // Adiciona o usuário decifrado à requisição
    next(); // Chama o próximo middleware/rota
  });
}

module.exports = authenticateToken;
