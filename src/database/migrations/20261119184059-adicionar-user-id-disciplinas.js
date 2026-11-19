module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Adiciona user_id inicialmente permitindo valores nulos
    await queryInterface.addColumn("disciplinas", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    // 2. Vincula as disciplinas antigas ao usuário existente
    await queryInterface.sequelize.query(`
      UPDATE disciplinas
      SET user_id = 1
      WHERE user_id IS NULL;
    `);

    // 3. Remove a restrição antiga de nome único
    await queryInterface.removeConstraint(
      "disciplinas",
      "disciplinas_name_key",
    );

    // 4. Cria unicidade por usuário e nome
    await queryInterface.addConstraint("disciplinas", {
      fields: ["user_id", "name"],
      type: "unique",
      name: "disciplinas_user_id_name_unique",
    });

    // 5. Torna user_id obrigatório
    await queryInterface.changeColumn("disciplinas", "user_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "disciplinas",
      "disciplinas_user_id_name_unique",
    );

    await queryInterface.addConstraint("disciplinas", {
      fields: ["name"],
      type: "unique",
      name: "disciplinas_name_key",
    });

    await queryInterface.removeColumn("disciplinas", "user_id");
  },
};
