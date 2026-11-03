const Preferencia = require("../models/preferencia");

const CAMPOS = ["area", "areaOutro", "estilo", "tempo", "objetivo", "periodo"];

module.exports = {
  // GET /usuarios/me/preferencias
  async mostrar(req, res) {
    try {
      const prefs = await Preferencia.findOne({
        where: { userId: req.userId },
      });
      return res.json(prefs || {});
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar preferências." });
    }
  },

  // PUT /usuarios/me/preferencias
  async salvar(req, res) {
    try {
      // o front envia a cada clique, então só atualiza o que veio no body
      const dados = {};
      CAMPOS.forEach((c) => {
        if (req.body[c] !== undefined) dados[c] = req.body[c];
      });
      if (dados.area && dados.area !== "Outro") dados.areaOutro = null;

      const [prefs] = await Preferencia.findOrCreate({
        where: { userId: req.userId },
        defaults: dados,
      });
      await prefs.update(dados);

      return res.json(prefs);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao salvar preferências." });
    }
  },
};
