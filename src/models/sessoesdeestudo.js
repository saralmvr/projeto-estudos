const { Model, DataTypes } = require("sequelize");

class SessoesDeEstudo extends Model {
  static init(sequelize) {
    super.init(
      {
        inicioEm: DataTypes.DATE,
        fimEm: DataTypes.DATE,
        duracaoSegundos: DataTypes.INTEGER,
        observacoes: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "sessoesdeestudo",
        timestamps: true,
        underscored: true,
      },
    );
  }
  static associate(models) {
    this.belongsTo(models.Conteudo, {
      foreignKey: "conteudo_id",
      as: "conteudo",
    });
  }
}

module.exports = SessoesDeEstudo;
