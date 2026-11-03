// src/routes/preferenciasRoutes.js
const { Router } = require("express");
const auth = require("../middlewares/authMiddleware");
const preferenciasController = require("../controllers/preferenciasController");

const routes = Router();

routes.get("/usuarios/me/preferencias", auth, preferenciasController.mostrar);
routes.put("/usuarios/me/preferencias", auth, preferenciasController.salvar);

module.exports = routes;
