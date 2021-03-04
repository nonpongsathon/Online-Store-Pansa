module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING(255),
        unique: true,
      },
      image: {
        type: DataTypes.STRING(255),
      },
      category: {
        type: DataTypes.STRING(255),
      },
      price: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      countInStock: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "Product",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  model.associate = (models) => {
    model.belongsToMany(models.OrderItems, {
      through: models.Has,
      foreignKey: "product_id",
    });
  };
  return model;
};
