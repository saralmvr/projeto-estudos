const Revisoes = require('../models/revisoes');
const Conteudo = require('../models/conteudo');

module.exports = {
  //Lista todas as revisões cadastradas incluindo os dados do conteúdo associado GET /revisoes
  async listar(req, res) {
    try {
      const revisoes = await Revisoes.findAll({
        include: { association: 'conteudo' }
      });
      return res.json(revisoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar revisões.', details: error.message });
    }
  },

  //Cria um novo agendamento ou registro de revisão para um conteúdo POST /revisoes
  async criar(req, res) {
    try {
      const { conteudo_id, dataAgendada, dataRealizada, status, observacoes } = req.body;
      
      const novaRevisao = await Revisoes.create({
        conteudo_id,
        dataAgendada,
        dataRealizada,
        status,
        observacoes
      });

      return res.status(201).json(novaRevisao);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar revisão.', details: error.message });
    }
  },

  //Busca uma revisão específica pelo ID trazendo as informações do conteúdo associado GET /revisoes/:id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const revisao = await Revisoes.findByPk(id, {
        include: { association: 'conteudo' }
      });
      
      if (!revisao) {
        return res.status(404).json({ error: 'Revisão não encontrada.' });
      }
      
      return res.json(revisao);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar revisão.', details: error.message });
    }
  },

  //Atualiza as informações, datas ou status de uma revisão existente PUT /revisoes/:id
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { conteudo_id, dataAgendada, dataRealizada, status, observacoes } = req.body;

      const revisao = await Revisoes.findByPk(id);
      if (!revisao) {
        return res.status(404).json({ error: 'Revisão não encontrada.' });
      }

      await revisao.update({
        conteudo_id,
        dataAgendada,
        dataRealizada,
        status,
        observacoes
      });

      return res.json(revisao);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar revisão.', details: error.message });
    }
  },

  //Remove em definitivo um registro de revisão da base de dados DELETE /revisoes/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const revisao = await Revisoes.findByPk(id);
      
      if (!revisao) {
        return res.status(404).json({ error: 'Revisão não encontrada.' });
      }

      await revisao.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar revisão.', details: error.message });
    }
  }
};
