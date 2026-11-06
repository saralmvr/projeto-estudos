const { Model, DataTypes } = require("sequelize");

class Timer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        tempo_ativo: DataTypes.INTEGER,
        tempo_pausa: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: "Timer",
        tableName: "timers",
        timestamps: true,
        underscored: true,
      },
    );

    return this;
  }
}

module.exports = Timer;
