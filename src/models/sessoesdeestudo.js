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
    this.belongsTo(models.disciplina, {
      foreignKey: "disciplina_Id",
      as: "disciplina",
    });

    this.belongsTo(models.conteudo, {
      foreignKey: "conteudo_Id",
      as: "conteudo",
    });
  }
}

module.exports = SessoesDeEstudo;