require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const routes = require("./routes/app");

const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(logger("dev"));

app.use(express.json());
app.use(routes);

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: "Rota não encontrada.",
    },
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
