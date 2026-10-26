const SessoesDeEstudo = require('../models/sessoesdeestudo');
const Disciplina = require('../models/disciplina');
const Conteudo = require('../models/conteudo');

module.exports = {
  //Lista todas as sessões de estudo trazendo os dados das tabelas relacionadas GET /sessoes
  async listar(req, res) {
    try {
      const sessoes = await SessoesDeEstudo.findAll({
        include: [
          { association: 'disciplina', attributes: ['id', 'name', 'descricao'] },
          { association: 'conteudo', attributes: ['id', 'descricao', 'status'] }
        ]
      });
      return res.json(sessoes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar sessões de estudo.', details: error.message });
    }
  },

  //Cria um registro de sessão de estudo mapeando os tempos e os vínculos externos POST /sessoes
  async criar(req, res) {
    try {
      const { disciplina_Id, conteudo_Id, inicioEm, fimEm, duracaoSegundos, observacoes } = req.body;
      
      const novaSessao = await SessoesDeEstudo.create({
        disciplina_Id,
        conteudo_Id,
        inicioEm,
        fimEm,
        duracaoSegundos,
        observacoes
      });

      return res.status(201).json(novaSessao);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar sessão de estudo.', details: error.message });
    }
  },

  //Busca os detalhes de uma sessão de estudo específica pelo seu ID GET /sessoes/:id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      //Busca pela chave primária trazendo os dados completos das associações de disciplina e conteúdo
      const sessao = await SessoesDeEstudo.findByPk(id, {
        include: [
          { association: 'disciplina' },
          { association: 'conteudo' }
        ]
      });
      
      if (!sessao) {
        return res.status(404).json({ error: 'Sessão de estudo não encontrada.' });
      }
      
      return res.json(sessao);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar sessão de estudo.', details: error.message });
    }
  },

  //Atualiza as informações ou os vínculos de uma sessão de estudo existente PUT /sessoes/:id
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      //Captura os dados que podem ter sido alterados pelo usuário
      const { disciplina_Id, conteudo_Id, inicioEm, fimEm, duracaoSegundos, observacoes } = req.body;

      const sessao = await SessoesDeEstudo.findByPk(id);
      if (!sessao) {
        return res.status(404).json({ error: 'Sessão de estudo não encontrada.' });
      }

      await sessao.update({
        disciplina_Id,
        conteudo_Id,
        inicioEm,
        fimEm,
        duracaoSegundos,
        observacoes
      });

      return res.json(sessao);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar sessão de estudo.', details: error.message });
    }
  },

  //Deleta um registro de sessão de estudo DELETE /sessoes/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const sessao = await SessoesDeEstudo.findByPk(id);
      
      if (!sessao) {
        return res.status(404).json({ error: 'Sessão de estudo não encontrada.' });
      }

      await sessao.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar sessão de estudo.', details: error.message });
    }
  }
};
