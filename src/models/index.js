const Sequelize = require("sequelize");
const config = require("../config/database");
const User = require("../models/user");
const Disciplina = require("../models/disciplina");
const conteudo = require("../models/conteudo");
const revisoes = require("../models/revisoes");
const sessoesdeestudo = require("../models/sessoesdeestudo");
const tarefas = require("../models/tarefas");

const models = [User, Disciplina, conteudo, revisoes, sessoesdeestudo, tarefas];

class Database {
  constructor() {
    this.init();
    this.associate();
  }

  init() {
    this.connection = new Sequelize(config);
    models.forEach((model) => model.init(this.connection));
  }

  associate() {
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

module.exports = new Database();
