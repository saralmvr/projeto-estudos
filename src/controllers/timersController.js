const Timer = require("../models/timer");

async function index(req, res) {
  try {
    const timers = await Timer.findAll();
    return res.status(200).json(timers);
  } catch (error) {
    console.error("Erro ao listar timers:", error);
    return res.status(500).json({
      error: "Erro ao buscar timers.",
    });
  }
}

async function show(req, res) {
  try {
    const timer = await Timer.findByPk(req.params.id);

    if (!timer) {
      return res.status(404).json({
        error: "Timer não encontrado.",
      });
    }

    return res.status(200).json(timer);
  } catch (error) {
    console.error("Erro ao buscar timer:", error);
    return res.status(500).json({
      error: "Erro ao buscar timer.",
    });
  }
}

async function create(req, res) {
  try {
    const timer = await Timer.create(req.body);

    return res.status(201).json(timer);
  } catch (error) {
    console.error("Erro ao criar timer:", error);
    return res.status(400).json({
      error: "Não foi possível criar o timer.",
    });
  }
}

async function update(req, res) {
  try {
    const timer = await Timer.findByPk(req.params.id);

    if (!timer) {
      return res.status(404).json({
        error: "Timer não encontrado.",
      });
    }

    await timer.update(req.body);

    return res.status(200).json(timer);
  } catch (error) {
    console.error("Erro ao atualizar timer:", error);
    return res.status(400).json({
      error: "Não foi possível atualizar o timer.",
    });
  }
}

async function remove(req, res) {
  try {
    const timer = await Timer.findByPk(req.params.id);

    if (!timer) {
      return res.status(404).json({
        error: "Timer não encontrado.",
      });
    }

    await timer.destroy();

    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir timer:", error);
    return res.status(500).json({
      error: "Erro ao excluir timer.",
    });
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  remove,
};
