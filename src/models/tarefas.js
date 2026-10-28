const { Model, DataTypes } = require("sequelize");

class Tarefa extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        descricao: DataTypes.STRING,
        prazo: DataTypes.DATE,
        status: DataTypes.ENUM("active", "inactive"),
        prioridade: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "tarefas",
        timestamps: true,
        underscored: true,
      },
    );
  }

  static associate(models) {
    // Altere para a primeira letra maiúscula (User e/ou Disciplina)
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    this.belongsTo(models.Disciplina, {
      foreignKey: "disciplina_id",
      as: "disciplina",
    });
  }
}

module.exports = Tarefa;
