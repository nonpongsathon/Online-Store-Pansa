module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "OrderItems",
    {
      product: {
        type: DataTypes.STRING(255),
      },
      qty: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "OrderItems",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  model.associate = (models) => {
    model.belongsToMany(models.Product, {
      through: models.Has,
      foreignKey: "orderItems_id",
    });
    model.belongsTo(models.Order, {
      foreignKey: "order_id",
    });
  };

  return model;
};
