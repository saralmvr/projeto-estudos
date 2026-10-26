const { Router } = require('express');
const disciplinaController = require('../controllers/disciplinaController');

const routes = Router();

routes.get('/disciplinas', disciplinaController.index);
routes.post('/disciplinas', disciplinaController.store);
routes.get('/disciplinas/:id', disciplinaController.show);
routes.put('/disciplinas/:id', disciplinaController.update);
routes.delete('/disciplinas/:id', disciplinaController.delete);

module.exports = routes;