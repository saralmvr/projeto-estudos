const Conteudo = require("../models/conteudo");
const Disciplina = require("../models/disciplina");

module.exports = {
  // Listar todos os conteúdos
  async listar(req, res) {
    try {
      const conteudos = await Conteudo.findAll({
        include: {
          association: "disciplina",
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
  // Criar um novo conteúdo
  async criar(req, res) {
    try {
      const { titulo, descricao, dataConclusao, disciplinaId } = req.body;

      if (!titulo)
        return res.status(400).json({ error: "O título é obrigatório." });
      if (!disciplinaId)
        return res.status(400).json({ error: "Selecione uma disciplina." });

      const disciplina = await Disciplina.findByPk(disciplinaId);
      if (!disciplina)
        return res.status(404).json({ error: "Disciplina não encontrada." });

      const novoConteudo = await Conteudo.create({
        titulo,
        descricao,
        dataConclusao: dataConclusao || null,
        disciplinaId,
      });

      return res.status(201).json(novoConteudo);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao criar conteúdo.", details: error.message });
    }
  },
  // Buscar conteúdo por ID
  async buscarPorId(req, res) {
    try {
      const conteudo = await Conteudo.findByPk(req.params.id, {
        include: { association: "disciplina" },
      });
      if (!conteudo)
        return res.status(404).json({ error: "Conteúdo não encontrado." });
      return res.json(conteudo);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao buscar conteúdo.", details: error.message });
    }
  },
  // Atualizar conteúdo existente
  async atualizar(req, res) {
    try {
      const conteudo = await Conteudo.findByPk(req.params.id);
      if (!conteudo)
        return res.status(404).json({ error: "Conteúdo não encontrado." });

      const { titulo, descricao, dataConclusao, status, disciplinaId } =
        req.body;
      await conteudo.update({
        titulo,
        descricao,
        dataConclusao,
        status,
        disciplinaId,
      });
      return res.json(conteudo);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao atualizar conteúdo.", details: error.message });
    }
  },
  // Deletar conteúdo existente
  async destroy(req, res) {
    try {
      const conteudo = await Conteudo.findByPk(req.params.id);
      if (!conteudo)
        return res.status(404).json({ error: "Conteúdo não encontrado." });
      await conteudo.destroy();
      return res.status(204).send();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao deletar conteúdo.", details: error.message });
    }
  },
};
