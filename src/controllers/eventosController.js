const Evento = require("../models/evento");

module.exports = {
  // LISTAR EVENTOS
  async index(req, res) {
    try {
      const eventos = await Evento.findAll({
        where: {
          userId: req.userId,
        },
        order: [["start", "ASC"]],
      });

      return res.status(200).json(eventos);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar eventos.",
        error: error.message,
      });
    }
  },

  // CRIAR EVENTO
  async store(req, res) {
    try {
      const { title, start, allDay } = req.body;

      if (!title || !start) {
        return res.status(400).json({
          message: "Título e data de início são obrigatórios.",
        });
      }

      if (Number.isNaN(Date.parse(start))) {
        return res.status(400).json({
          message: "Data de início inválida.",
        });
      }

      const evento = await Evento.create({
        title,
        start,
        allDay: allDay ?? false,
        userId: req.userId,
      });

      return res.status(201).json(evento);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar evento.",
        error: error.message,
      });
    }
  },

  // ATUALIZAR EVENTO
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, start, allDay } = req.body;

      const evento = await Evento.findOne({
        where: {
          id,
          userId: req.userId,
        },
      });

      if (!evento) {
        return res.status(404).json({
          message: "Evento não encontrado.",
        });
      }

      if (title !== undefined) {
        if (typeof title !== "string" || !title.trim()) {
          return res.status(400).json({
            message: "Título inválido.",
          });
        }

        evento.title = title;
      }

      if (start !== undefined) {
        if (Number.isNaN(Date.parse(start))) {
          return res.status(400).json({
            message: "Data de início inválida.",
          });
        }

        evento.start = start;
      }

      if (allDay !== undefined) {
        if (typeof allDay !== "boolean") {
          return res.status(400).json({
            message: "allDay deve ser verdadeiro ou falso.",
          });
        }

        evento.allDay = allDay;
      }

      await evento.save();

      return res.status(200).json(evento);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar evento.",
        error: error.message,
      });
    }
  },

  // EXCLUIR EVENTO
  async delete(req, res) {
    try {
      const { id } = req.params;

      const evento = await Evento.findOne({
        where: {
          id,
          userId: req.userId,
        },
      });

      if (!evento) {
        return res.status(404).json({
          message: "Evento não encontrado.",
        });
      }

      await evento.destroy();

      return res.status(200).json({
        message: "Evento excluído com sucesso.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao excluir evento.",
        error: error.message,
      });
    }
  },
};
