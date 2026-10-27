const Conteudo = require("../models/conteudo");
const Disciplina = require("../models/disciplina");

module.exports = {
  //Lista todos os conteúdos cadastrados carregando os dados da disciplina associada GET /conteudos

  async listar(req, res) {
    try {
      //Busca todos os conteúdos incluindo o relacionamento com disciplinas
      const conteudos = await Conteudo.findAll({
        include: {
          association: "disciplinas",
          attributes: ["id", "name", "descricao"],
        },
      });
      return res.json(conteudos);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao listar conteúdos.", details: error.message });
    }
  },

  //Cria um novo conteúdo vinculado a uma disciplina específica POST /conteudos
  async criar(req, res) {
    try {
      const { name, descricao, status, disciplina_Id } = req.body;

      //Insere o novo conteúdo mapeando os relacionamentos corretamente
      const novoConteudo = await Conteudo.create({
        name,
        descricao,
        status,
        disciplina_Id,
      });

      return res.status(201).json(novoConteudo);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao criar conteúdo.", details: error.message });
    }
  },

  //Busca um conteúdo específico pelo seu ID trazendo todos os dados da disciplina associada GET /conteudos/:id
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const conteudo = await Conteudo.findByPk(id, {
        include: { association: "disciplinas" },
      });

      if (!conteudo) {
        return res.status(404).json({ error: "Conteúdo não encontrado." });
      }

      return res.json(conteudo);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar conteúdo.", details: error.message });
    }
  },

  //Atualiza as propriedades de um conteúdo existente PUT /conteudos/:id
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { name, descricao, status, disciplina_Id } = req.body;

      //Valida se o registro existe antes de executar a modificação
      const conteudo = await Conteudo.findByPk(id);
      if (!conteudo) {
        return res.status(404).json({ error: "Conteúdo não encontrado." });
      }

      await conteudo.update({
        name,
        descricao,
        status,
        disciplina_Id,
      });

      return res.json(conteudo);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao atualizar conteúdo.", details: error.message });
    }
  },

  //Remove de forma definitiva um conteúdo do banco de dados DELETE /conteudos/:id
  async destroy(req, res) {
    try {
      const { id } = req.params;
      const conteudo = await Conteudo.findByPk(id);

      if (!conteudo) {
        return res.status(404).json({ error: "Conteúdo não encontrado." });
      }

      await conteudo.destroy();
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao deletar conteúdo.", details: error.message });
    }
  },
};
