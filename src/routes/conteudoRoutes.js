const { Router } = require('express');
const conteudoController = require('../controllers/conteudosController');

const routes = Router();

routes.get('/conteudos', conteudoController.listar);
routes.post('/conteudos', conteudoController.criar);
routes.get('/conteudos/:id', conteudoController.buscarPorId);
routes.put('/conteudos/:id', conteudoController.atualizar);
routes.delete('/conteudos/:id', conteudoController.destroy);

module.exports = routes;