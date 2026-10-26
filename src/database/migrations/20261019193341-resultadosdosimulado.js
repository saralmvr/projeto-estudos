module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("resultadodossimulados", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      simulado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "simulados", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      disciplina_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "disciplinas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      questoes_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      quatidade_acertos: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      questones_erradas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    return queryInterface.dropTable("resultadodossimulados");
  },
};