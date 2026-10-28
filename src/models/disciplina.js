const { Model, DataTypes } = require("sequelize");

class Disciplina extends Model {
  static init(sequelize) {
    super.init(
      {
        name: { type: DataTypes.STRING, allowNull: false },
        descricao: { type: DataTypes.STRING, allowNull: true },
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
    // Passando o nome do modelo diretamente por string
    this.hasMany(models["Conteudo"] || models["conteudo"], {
      foreignKey: "disciplina_id",
      as: "conteudos",
    });
  }
}

module.exports = Disciplina;
