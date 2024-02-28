module.exports = (sequelize, DataTypes) => {
  const Subcription = sequelize.define(
    "Subcription",
    {
      id: {
        type: DataTypes.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      estado: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
      },
    },
    { tableName: "subcripcion" }
  );

  return Subcription;
};
