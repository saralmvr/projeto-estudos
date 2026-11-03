const { Model, DataTypes } = require("sequelize");

class Preferencia extends Model {
  static init(sequelize) {
    super.init(
      {
        area: DataTypes.STRING,
        areaOutro: DataTypes.STRING,
        estilo: DataTypes.STRING,
        tempo: DataTypes.STRING,
        objetivo: DataTypes.STRING,
        periodo: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "preferencias",
        timestamps: true,
        underscored: true,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  }
}

module.exports = Preferencia;
