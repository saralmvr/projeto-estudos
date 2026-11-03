const { Router } = require("express");

const auth = require("../middlewares/authMiddleware");
const eventosController = require("../controllers/eventosController");

const routes = Router();

routes.get("/eventos", auth, eventosController.index);
routes.post("/eventos", auth, eventosController.store);
routes.put("/eventos/:id", auth, eventosController.update);
routes.delete("/eventos/:id", auth, eventosController.delete);

module.exports = routes;
