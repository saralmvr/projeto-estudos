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

        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
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
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "usuario",
    });

    this.hasMany(models.Conteudo, {
      foreignKey: "disciplina_id",
      as: "conteudos",
    });
  }
}

module.exports = Disciplina;
