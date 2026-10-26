const Sequelize = require("sequelize");
const config = require("../config/database");
const User = require("../models/user");

console.log("User    :", typeof User, User && typeof User.init);

const models = [User];

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
