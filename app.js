const express = require("express");

const app = express();
const routes = require("./routes/routes");

const cors = require("cors");

app.use(express.json({ limit: "10mb" })); // Ajuste o limite conforme necessário
app.use(cors());
app.use("/", routes);

app.listen(3000, () => {
  console.log("Servidor iniciado");
});
