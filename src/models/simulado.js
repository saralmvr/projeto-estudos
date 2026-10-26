const { Model, DataTypes } = require("sequelize");

class Simulado extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: DataTypes.STRING,
        dataRealizacao: DataTypes.DATE,
        quantidadeDeQuestoes: DataTypes.INTEGER,
        observacoes: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "simulados",
        timestamps: true,
        underscored: true,
      },
    );
  }
}

module.exports = Simulado;