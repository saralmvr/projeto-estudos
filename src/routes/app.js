require("../models/index");
const { Router } = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const disciplinaRoutes = require("./disciplinaRoutes");
const conteudoRoutes = require("./conteudoRoutes");
const tarefasRoutes = require("./tarefasRoutes");
const revisoesRoutes = require("./revisoesRoutes");
const sessoesRoutes = require("./sessoesDeEstudoRoutes");
const preferenciasRoutes = require("./preferenciasRoutes");
const usersRoutes = require("./userRoutes");
const eventosRoutes = require("./eventosRoutes");

const routes = Router();

routes.use(eventosRoutes);
routes.use(usersRoutes);
routes.use(preferenciasRoutes);
routes.use(authMiddleware);
routes.use(disciplinaRoutes);
routes.use(conteudoRoutes);
routes.use(tarefasRoutes);
routes.use(revisoesRoutes);
routes.use(sessoesRoutes);

module.exports = routes;
