const Simulado = require('../models/simulado');

module.exports = {
  //Lista todos os simulados cadastrados GET /simulados
  async listar(req, res) {
    try {
      // Busca todos os registros mapeados no banco de dados
      const simulados = await Simulado.findAll();
      return res.json(simulados);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar simulados.', details: error.message });
    }
  },

  //Cria um novo registro de simulado no banco de dados POST /simulados
  async criar(req, res) {
    try {
      const { titulo, dataRealizacao, quantidadedeQuestoes, observacoes } = req.body;
      
      const novoSimulado = await Simulado.create({
        titulo,
        dataRealizacao,
        quantidadedeQuestoes,
        observacoes
      });

      return res.status(201).json(novoSimulado);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar simulado.', details: error.message });
    }
  },

  //Busca um simulado específico através da sua chave primária GET /simulados/:id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const simulado = await Simulado.findByPk(id);
      
      if (!simulado) {
        return res.status(404).json({ error: 'Simulado não encontrado.' });
      }
      
      return res.json(simulado);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar simulado.', details: error.message });
    }
  },

  //Atualiza as informações de um simulado existente PUT /simulados/:id/
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, dataRealizacao, quantidadedeQuestoes, observacoes } = req.body;

      //Executa uma verificação prévia para garantir que o registro ainda existe na base de dados
      const simulado = await Simulado.findByPk(id);
      if (!simulado) {
        return res.status(404).json({ error: 'Simulado não encontrado.' });
      }

      await simulado.update({
        titulo,
        dataRealizacao,
        quantidadedeQuestoes,
        observacoes
      });

      return res.json(simulado);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar simulado.', details: error.message });
    }
  },

  //Remove em definitivo um registro de simulado da base de dados DELETE /simulados/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const simulado = await Simulado.findByPk(id);
      
      //Valida se o objeto foi localizado para prevenir tentativas em registros inválidos
      if (!simulado) {
        return res.status(404).json({ error: 'Simulado não encontrado.' });
      }

      await simulado.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar simulado.', details: error.message });
    }
  }
};
