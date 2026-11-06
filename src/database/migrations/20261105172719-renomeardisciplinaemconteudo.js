module.exports = {
  up: (queryInterface) => {
    return queryInterface.renameColumn(
      "conteudos",
      "disciplinaId",
      "disciplina_id",
    );
  },
  down: (queryInterface) => {
    return queryInterface.renameColumn(
      "conteudos",
      "disciplina_id",
      "disciplinaId",
    );
  },
};
