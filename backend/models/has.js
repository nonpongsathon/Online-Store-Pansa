module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Has",
    {},
    {
      tableName: "Has",
      timestamps: true,
    }
  );
  return model;
};
