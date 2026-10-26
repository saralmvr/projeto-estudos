const { Model, DataTypes } = require("sequelize");

class Revisoes extends Model {
  static init(sequelize) {
    super.init(
      {
        dataAgendada: DataTypes.DATE,
        dataRealizada: DataTypes.DATE,
        status: DataTypes.ENUM("active", "inactive"),
        observacoes: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "revisoes",
        timestamps: true,
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.conteudo, {
      foreignKey: "conteudo_id",
      as: "conteudo",
    });
  }
}

module.exports = Revisoes;