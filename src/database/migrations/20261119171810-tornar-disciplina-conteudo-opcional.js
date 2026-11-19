module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("conteudos", "disciplina_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "disciplinas",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("conteudos", "disciplina_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "disciplinas",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
