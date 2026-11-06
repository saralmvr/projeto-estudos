const { Router } = require("express");
const UserController = require("../controllers/userscontroller");
const authMiddleware = require("../middlewares/authMiddleware");
const AuthController = require('../controllers/userscontroller');

const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/login", UserController.login);
// rotas que precisam de middleware

routes.use(authMiddleware);
routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.delete);

// Rota para redefinir senha
router.post('/esqueci-senha', AuthController.esqueciSenha);

module.exports = routes;
