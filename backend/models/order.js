module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Order",
    {
      customer: {
        type: DataTypes.STRING(255),
      },
      shippingAddress: {
        type: DataTypes.STRING(255),
      },
      totalPrice: {
        type: DataTypes.INTEGER,
      },
      totalQty: {
        type: DataTypes.INTEGER,
      },
      paid: {
        type: DataTypes.BOOLEAN,
      },
      delivered: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "Order",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  model.associate = (models) => {
    model.belongsTo(models.User, { foreignKey: "user_id" });
    model.hasMany(models.OrderItems, {
      foreignKey: "order_id",
    });
  };
  return model;
};
