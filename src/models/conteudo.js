const { Model, DataTypes } = require("sequelize");

class Conteudo extends Model {
  static init(sequelize) {
    super.init(
      {
        disciplinaId: {
          type: DataTypes.INTEGER,
          field: "disciplina_id",
          allowNull: false,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        descricao: { type: DataTypes.TEXT, allowNull: true },
        dataConclusao: { type: DataTypes.DATEONLY, field: "data_conclusao" },
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
    this.belongsTo(models.disciplina, {
      foreignKey: "disciplina_Id",
      as: "disciplinas",
    });
  }
}

module.exports = Conteudo;
