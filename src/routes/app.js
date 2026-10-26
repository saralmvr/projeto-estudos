require('../models/index')
const { Router } = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const disciplinaRoutes = require("./disciplinaRoutes");
const conteudoRoutes = require("./conteudoRoutes");
const tarefasRoutes = require("./tarefasRoutes");
const revisoesRoutes = require("./revisoesRoutes");
const sessoesRoutes = require("./sessoesDeEstudoRoutes");
const simuladoRoutes = require("./simuladoRoutes");
const resultadoSimuladoRoutes = require("./resultadoDosSimulados");
const usersRoutes = require("./userRoutes");

const routes = Router();


routes.use(usersRoutes);

routes.use(authMiddleware);
routes.use(disciplinaRoutes);
routes.use(conteudoRoutes);
routes.use(tarefasRoutes);
routes.use(revisoesRoutes);
routes.use(sessoesRoutes);
routes.use(simuladoRoutes);
routes.use(resultadoSimuladoRoutes);

module.exports = routes;
