const { Model, DataTypes } = require("sequelize");

class Evento extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },

        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        start: {
          type: DataTypes.DATE,
          allowNull: false,
        },

        allDay: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          field: "all_day",
        },

        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          field: "user_id",
        },
      },
      {
        sequelize,
        modelName: "Evento",
        tableName: "eventos",
        timestamps: true,
        underscored: true,
      },
    );
  }
}

module.exports = Evento;
