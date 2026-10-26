const Disciplina = require("../models/disciplina"); // Certifique-se de criar o model correspondente

class DisciplinaController {
  async index(req, res) {
    try {
      const disciplinas = await Disciplina.findAll();
      return res.json(disciplinas);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar disciplinas.", details: error.message });
    }
  }

  async show(req, res) {
    try {
      const disciplina = await Disciplina.findByPk(req.params.id);

      if (!disciplina) {
        return res.status(404).json({ error: "Disciplina não encontrada." });
      }

      return res.json(disciplina);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar disciplina.", details: error.message });
    }
  }

  async store(req, res) {
    try {
      const { name, descricao } = req.body;

      // Validação básica para garantir que o nome foi enviado
      if (!name) {
        return res.status(400).json({ error: "O nome da disciplina é obrigatório." });
      }

      // Verifica se já existe uma disciplina cadastrada com o mesmo nome
      const disciplinaExists = await Disciplina.findOne({ where: { nome } });

      if (disciplinaExists) {
        return res.status(400).json({ error: "Esta disciplina já está cadastrada." });
      }

      const disciplina = await Disciplina.create({ nome, descricao });
      return res.status(201).json(disciplina);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao criar disciplina.", details: error.message });
    }
  }

  async update(req, res) {
    try {
      const disciplina = await Disciplina.findByPk(req.params.id);

      if (!disciplina) {
        return res.status(404).json({ error: "Disciplina não encontrada." });
      }

      const { name, descricao } = req.body;

      // Se o nome for alterado, verifica se já não existe outra disciplina com esse novo nome
      if (name && name !== disciplina.name) {
        const disciplinaExists = await Disciplina.findOne({ where: { name } });
        if (disciplinaExists) {
          return res.status(400).json({ error: "Já existe outra disciplina com este nome." });
        }
      }

      await disciplina.update({ name, descricao });

      return res.json(disciplina);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar disciplina.", details: error.message });
    }
  }

  async delete(req, res) {
    try {
      const disciplina = await Disciplina.findByPk(req.params.id);

      if (!disciplina) {
        return res.status(404).json({ error: "Disciplina não encontrada." });
      }

      await disciplina.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar disciplina.", details: error.message });
    }
  }
}

module.exports = new DisciplinaController();
