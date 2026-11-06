const Sequelize = require("sequelize");
const config = require("../config/database");

const User = require("./user");
const Disciplina = require("./disciplina");
const Conteudo = require("./conteudo");
const Revisoes = require("./revisoes");
const SessoesDeEstudo = require("./sessoesdeestudo");
const Tarefas = require("./tarefas");
const Preferencia = require("./preferencia");
const Evento = require("./evento");
const Timer = require("./timer");

const models = [
  User,
  Disciplina,
  Conteudo,
  Revisoes,
  SessoesDeEstudo,
  Tarefas,
  Preferencia,
  Evento,
  Timer,
];

class Database {
  constructor() {
    this.init();
    this.associate();
  }

  init() {
    this.connection = new Sequelize(config);

    models.forEach((model) => {
      model.init(this.connection);
    });
  }

  associate() {
    models.forEach((model) => {
      if (typeof model.associate === "function") {
        model.associate(this.connection.models);
      }
    });
  }
}

module.exports = new Database();
