module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );

  Category.associate = (models) => {
    Category.belongsToMany(models.Product, {
      through: "ProductCategory",
      foreignKey: "category_id",
      otherKey: "product_id",
    });
  };

  return Category;
};

