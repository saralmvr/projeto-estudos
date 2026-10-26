const { Model, DataTypes } = require("sequelize");

class ResultadoDosSimulado extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        questoesTotal: DataTypes.INTEGER,
        quantidadeAcertos: DataTypes.INTEGER,
        questoesErradas: DataTypes.INTEGER,
        observacoes: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "resultadodossimulados",
        timestamps: true,
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.simulado, {
      foreignKey: "simulado_id",
      as: "simulado",
    });

    this.belongsTo(models.disciplina, {
      foreignKey: "disciplina_id",
      as: "disciplina",
    });
  }
}

module.exports = ResultadoDosSimulado;