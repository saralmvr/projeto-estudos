module.exports = {
  up: async (queryInterface) => {
    const table = await queryInterface.describeTable("conteudos");

    if (table.disciplinaId && !table.disciplina_id) {
      await queryInterface.renameColumn(
        "conteudos",
        "disciplinaId",
        "disciplina_id",
      );
    }
  },

  down: async (queryInterface) => {
    const table = await queryInterface.describeTable("conteudos");

    if (table.disciplina_id && !table.disciplinaId) {
      await queryInterface.renameColumn(
        "conteudos",
        "disciplina_id",
        "disciplinaId",
      );
    }
  },
};
