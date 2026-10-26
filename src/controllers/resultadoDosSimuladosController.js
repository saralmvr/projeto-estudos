const ResultadoDosSimulado = require('../models/resultadodossimulado');
const Simulado = require('../models/simulado');
const Disciplina = require('../models/disciplina');
const { destroy } = require('./disciplinaController');

module.exports = {
  //Lista todos os resultados cadastrados trazendo os dados completos do simulado e da disciplina associados GET /resultados
  async listar(req, res) {
    try {
      const resultados = await ResultadoDosSimulado.findAll({
        include: [
          { association: 'simulado' },
          { association: 'disciplina' }
        ]
      });
      return res.json(resultados);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar resultados dos simulados.', details: error.message });
    }
  },

  //Cria um novo registro de desempenho/resultado atrelado a um simulado e uma disciplina POST /resultados
  async criar(req, res) {
    try {
      const { simulado_id, disciplina_id, titulo, questoesTotal, quatidadeAcertos, questoesErradas, observacoes } = req.body;
      
      const novoResultado = await ResultadoDosSimulado.create({
        simulado_id,
        disciplina_id,
        titulo,
        questoesTotal,
        quatidadeAcertos,
        questoesErradas,
        observacoes
      });

      return res.status(201).json(novoResultado);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar resultado de simulado.', details: error.message });
    }
  },

  //Busca um resultado específico pelo seu ID (chave primária) trazendo as associações agregadas GET /resultados/:id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await ResultadoDosSimulado.findByPk(id, {
        include: [
          { association: 'simulado' },
          { association: 'disciplina' }
        ]
      });
      
      if (!resultado) {
        return res.status(404).json({ error: 'Resultado de simulado não encontrado.' });
      }
      
      return res.json(resultado);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar resultado de simulado.', details: error.message });
    }
  },

  //Atualiza os dados ou os vínculos relacionais de um resultado existente PUT /resultados/:id
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { simulado_id, disciplina_id, titulo, questoesTotal, quatidadeAcertos, questoesErradas, observacoes } = req.body;

      const resultado = await ResultadoDosSimulado.findByPk(id);
      if (!resultado) {
        return res.status(404).json({ error: 'Resultado de simulado não encontrado.' });
      }

      await resultado.update({
        simulado_id,
        disciplina_id,
        titulo,
        questoesTotal,
        quatidadeAcertos,
        questoesErradas,
        observacoes
      });

      return res.json(resultado);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar resultado de simulado.', details: error.message });
    }
  },

  //Remove em definitivo um registro de resultado da base de dados DELETE /resultados/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const resultado = await ResultadoDosSimulado.findByPk(id);
      
      if (!resultado) {
        return res.status(404).json({ error: 'Resultado de simulado não encontrado.' });
      }

      await resultado.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar resultado de simulado.', details: error.message });
    }
  }
};
