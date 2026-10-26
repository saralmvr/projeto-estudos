const { Router } = require('express');
const simuladoController = require('../controllers/simuladoController');

const routes = Router();

routes.get('/simulados', simuladoController.listar);
routes.post('/simulados', simuladoController.criar);
routes.get('/simulados/:id', simuladoController.buscarPorId);
routes.put('/simulados/:id', simuladoController.atualizar);
routes.delete('/simulados/:id', simuladoController.destroy);

module.exports = routes;