module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      profile: {
        type: DataTypes.BIGINT(20),
        allowNull: true,
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
      },
    },
    {
      tableName: "Usuarios",
      timestamps: false,
    }
  );

  return User;
};
