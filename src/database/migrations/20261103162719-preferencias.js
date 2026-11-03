// src/database/migrations/20261103120000-preferencias.js
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("preferencias", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true, // uma linha de preferências por usuário
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      area: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      area_outro: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      estilo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tempo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      objetivo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      periodo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("preferencias");
  },
};
