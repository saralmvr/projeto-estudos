const { Router } = require('express');
const revisaoController = require('../controllers/revisoesController');

const routes = Router();

routes.get('/revisoes', revisaoController.listar);
routes.post('/revisoes', revisaoController.criar);
routes.get('/revisoes/:id', revisaoController.buscarPorId);
routes.put('/revisoes/:id', revisaoController.atualizar);
routes.delete('/revisoes/:id', revisaoController.destroy);

module.exports = routes;