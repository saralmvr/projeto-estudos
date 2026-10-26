const { Router } = require('express');
const tarefaController = require('../controllers/tarefasController');

const routes = Router();

routes.get('/tarefas', tarefaController.listar);
routes.post('/tarefas', tarefaController.criar);
routes.get('/tarefas/:id', tarefaController.buscarPorId);
routes.put('/tarefas/:id', tarefaController.atualizar);
routes.delete('/tarefas/:id', tarefaController.destroy);

module.exports = routes;