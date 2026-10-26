module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("sessoesdeestudo", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      disciplina_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "disciplinas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      conteudo_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "conteudos", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      inicio_em: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fim_em: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      duracao_segundos: {
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
    return queryInterface.dropTable("sessoesdeestudo");
  },
};