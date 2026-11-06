const { Model, DataTypes } = require("sequelize");

class Tarefa extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        descricao: DataTypes.STRING,
        prazo: DataTypes.DATE,
        status: {
          type: DataTypes.ENUM("active", "inactive"),
          defaultValue: "active",
        },
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
    this.belongsTo(models.Disciplina, {
      foreignKey: "disciplina_id",
      as: "disciplina",
    });
    this.belongsTo(models.Conteudo, {
      foreignKey: "conteudo_id",
      as: "conteudo",
    });
  }
}

module.exports = Tarefa;
