const { Model, DataTypes } = require("sequelize");

class Tarefa extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
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
    this.belongsTo(models.disciplina, {
      foreignKey: "disciplina_id",
      as: "disciplina",
    });
    this.belongsTo(models.conteudo, {
      foreignKey: "conteudo_id",
      as: "conteudo",
    });
  }
}

module.exports = Tarefa;