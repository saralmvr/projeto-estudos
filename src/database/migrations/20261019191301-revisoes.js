module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("revisoes", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      conteudo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "conteudos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      data_agendada: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      data_realizada: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
      observacoes: {
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
    return queryInterface.dropTable("revisoes");
  },
};