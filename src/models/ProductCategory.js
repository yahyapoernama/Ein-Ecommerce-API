module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define(
    "ProductCategory",
    {
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ProductCategory",
      tableName: "product_categories",
      timestamps: true,
      underscored: true,
    }
  );

  ProductCategory.associate = (models) => {
    ProductCategory.belongsTo(models.Product, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
    });

    ProductCategory.belongsTo(models.Category, {
      foreignKey: "category_id",
      onDelete: "CASCADE",
    });
  };

  return ProductCategory;
}