const { Model, DataTypes } = require("sequelize");

class Disciplina extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        descricao: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "disciplinas",
        timestamps: true,
        underscored: true,
      },
    );
  }
  static associate(models) {
    this.hasMany(models.conteudo, {
      foreignKey: "disciplina_Id",
      as: "conteudos",
    });
  }
}

module.exports = Disciplina;
