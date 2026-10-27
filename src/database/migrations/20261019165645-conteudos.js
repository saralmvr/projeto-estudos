module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("conteudos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      disciplinaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "disciplinas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("ativo", "inativo"),
        allowNull: true,
        defaultValue: "ativo",
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
    return queryInterface.dropTable("conteudos");
  },
};
