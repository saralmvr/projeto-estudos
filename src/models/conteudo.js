const { Model, DataTypes } = require("sequelize");

class Conteudo extends Model {
  static init(sequelize) {
    super.init(
      {
        disciplina_id: {
          type: DataTypes.INTEGER,
          field: "disciplina_id",
          allowNull: false,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        descricao: { type: DataTypes.TEXT, allowNull: true },
        status: {
          type: DataTypes.ENUM("ativo", "inativo"),
          defaultValue: "ativo",
        },
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
    this.belongsTo(models.Disciplina, {
      foreignKey: "disciplina_id",
      as: "disciplina",
    });
  }
}

module.exports = Conteudo;
