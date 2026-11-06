const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        provider: DataTypes.BOOLEAN,
        password_hash: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        // Novos campos para recuperação de senha
        reset_password_token: DataTypes.STRING,
        reset_password_expires: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: "users",
        timestamps: true,
        underscored: true,
      },
    );

    this.addHook("beforeSave", async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
  }
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
