const { Op } = require("sequelize");
const Disciplina = require("../models/disciplina");

class DisciplinaController {
  async index(req, res) {
    try {
      const disciplinas = await Disciplina.findAll({
        where: { user_id: req.userId },
      });

      return res.json(disciplinas);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar disciplinas.",
        details: error.message,
      });
    }
  }

  async show(req, res) {
    try {
      const disciplina = await Disciplina.findOne({
        where: {
          id: req.params.id,
          user_id: req.userId,
        },
      });

      if (!disciplina) {
        return res.status(404).json({
          error: "Disciplina não encontrada.",
        });
      }

      return res.json(disciplina);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao buscar disciplina.",
        details: error.message,
      });
    }
  }

  async store(req, res) {
    try {
      const { name, descricao } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({
          error: "O nome da disciplina é obrigatório.",
        });
      }

      const disciplinaExists = await Disciplina.findOne({
        where: {
          name: name.trim(),
          user_id: req.userId,
        },
      });

      if (disciplinaExists) {
        return res.status(400).json({
          error: "Esta disciplina já está cadastrada.",
        });
      }

      const disciplina = await Disciplina.create({
        name: name.trim(),
        descricao,
        user_id: req.userId,
      });

      return res.status(201).json(disciplina);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao criar disciplina.",
        details: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const disciplina = await Disciplina.findOne({
        where: {
          id: req.params.id,
          user_id: req.userId,
        },
      });

      if (!disciplina) {
        return res.status(404).json({
          error: "Disciplina não encontrada.",
        });
      }

      const { name, descricao } = req.body;

      if (name !== undefined && !name.trim()) {
        return res.status(400).json({
          error: "O nome da disciplina não pode ficar vazio.",
        });
      }

      if (name !== undefined && name.trim() !== disciplina.name) {
        const disciplinaExists = await Disciplina.findOne({
          where: {
            name: name.trim(),
            user_id: req.userId,
            id: { [Op.ne]: disciplina.id },
          },
        });

        if (disciplinaExists) {
          return res.status(400).json({
            error: "Já existe outra disciplina com este nome.",
          });
        }
      }

      await disciplina.update({
        ...(name !== undefined && { name: name.trim() }),
        ...(descricao !== undefined && { descricao }),
      });

      return res.json(disciplina);
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao atualizar disciplina.",
        details: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const disciplina = await Disciplina.findOne({
        where: {
          id: req.params.id,
          user_id: req.userId,
        },
      });

      if (!disciplina) {
        return res.status(404).json({
          error: "Disciplina não encontrada.",
        });
      }

      await disciplina.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao deletar disciplina.",
        details: error.message,
      });
    }
  }
}

module.exports = new DisciplinaController();
