const Tarefa = require("../models/tarefas");
const Disciplina = require("../models/disciplina");
const Conteudo = require("../models/conteudo");

module.exports = {
  //Lista todas as tarefas cadastradas, trazendo juntas as informações da disciplina e do conteúdo relacionados GET /tarefas
  async listar(req, res) {
    try {
      const tarefas = await Tarefa.findAll({
        include: [{ association: "disciplina" }, { association: "conteudo" }],
      });
      return res.json(tarefas);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao listar tarefas.", details: error.message });
    }
  },

  //Cria uma nova tarefa vinculada opcionalmente ou obrigatoriamente a uma disciplina e conteúdo POST /tarefas
  async criar(req, res) {
    try {
      const {
        disciplina_id,
        conteudo_id,
        name,
        descricao,
        prazo,
        status,
        prioridade,
      } = req.body;

      const novaTarefa = await Tarefa.create({
        disciplina_id,
        conteudo_id,
        name,
        descricao,
        prazo,
        status,
        prioridade,
      });

      return res.status(201).json(novaTarefa);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao criar tarefa.", details: error.message });
    }
  },

  //Busca uma tarefa específica através do seu ID de chave primária, incluindo seus relacionamentos GET /tarefas/:id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const tarefa = await Tarefa.findByPk(id, {
        include: [{ association: "disciplina" }, { association: "conteudo" }],
      });

      if (!tarefa) {
        return res.status(404).json({ error: "Tarefa não encontrada." });
      }

      return res.json(tarefa);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar tarefa.", details: error.message });
    }
  },

  //Atualiza as informações, prazos, prioridades ou relacionamentos de uma tarefa existente PUT /tarefas/:id
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const {
        disciplina_id,
        conteudo_id,
        name,
        descricao,
        prazo,
        status,
        prioridade,
      } = req.body;

      const tarefa = await Tarefa.findByPk(id);
      if (!tarefa) {
        return res.status(404).json({ error: "Tarefa não encontrada." });
      }

      await tarefa.update({
        disciplina_id,
        conteudo_id,
        name,
        descricao,
        prazo,
        status,
        prioridade,
      });

      return res.json(tarefa);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao atualizar tarefa.", details: error.message });
    }
  },

  //Remove em definitivo um registro de tarefa da base de dados DELETE /tarefas/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const tarefa = await Tarefa.findByPk(id);

      if (!tarefa) {
        return res.status(404).json({ error: "Tarefa não encontrada." });
      }

      await tarefa.destroy();
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao deletar tarefa.", details: error.message });
    }
  },
};
