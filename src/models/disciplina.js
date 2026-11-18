const { Model, DataTypes } = require("sequelize");

class Disciplina extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        descricao: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "disciplinas",
        timestamps: true,
        underscored: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Conteudo, {
      foreignKey: "disciplina_id",
      as: "conteudos",
    });
  }
}

module.exports = Disciplina;
