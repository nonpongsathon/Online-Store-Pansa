module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING(255),
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      tableName: "User",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  model.associate = (models) => {
    model.hasMany(models.Order, { foreignKey: "user_id" });
  };

  return model;
};
