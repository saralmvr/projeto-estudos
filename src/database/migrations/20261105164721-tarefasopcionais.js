module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .changeColumn("tarefas", "disciplina_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
      })
      .then(() =>
        queryInterface.changeColumn("tarefas", "conteudo_id", {
          type: Sequelize.INTEGER,
          allowNull: true,
        }),
      )
      .then(() =>
        queryInterface.changeColumn("tarefas", "prazo", {
          type: Sequelize.DATE,
          allowNull: true,
        }),
      )
      .then(() =>
        queryInterface.changeColumn("tarefas", "prioridade", {
          type: Sequelize.STRING,
          allowNull: true,
        }),
      );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface
      .changeColumn("tarefas", "disciplina_id", {
        type: Sequelize.INTEGER,
        allowNull: false,
      })
      .then(() =>
        queryInterface.changeColumn("tarefas", "conteudo_id", {
          type: Sequelize.INTEGER,
          allowNull: false,
        }),
      )
      .then(() =>
        queryInterface.changeColumn("tarefas", "prazo", {
          type: Sequelize.DATE,
          allowNull: false,
        }),
      )
      .then(() =>
        queryInterface.changeColumn("tarefas", "prioridade", {
          type: Sequelize.STRING,
          allowNull: false,
        }),
      );
  },
};
