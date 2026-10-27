const { Model, DataTypes } = require("sequelize");

class Conteudo extends Model {
  static init(sequelize) {
    super.init(
      {
        descricao: DataTypes.STRING,
        status: DataTypes.ENUM("active", "inactive"),
        name: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "conteudos",
        timestamps: true,
        underscored: true,
      },
    );
  }
  static associate(models) {
    this.belongsTo(models.disciplina, {
      foreignKey: "disciplina_Id",
      as: "disciplinas",
    });
  }
}

module.exports = Conteudo;
