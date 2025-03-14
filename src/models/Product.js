module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
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
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      store_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "stores",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: true,
      paranoid: true,
      underscored: true,
    }
  );
  
  Product.associate = (models) => {
    Product.belongsTo(models.Store, { 
      foreignKey: "store_id",
      onDelete: "CASCADE",
    });

    Product.belongsToMany(models.Collection, { 
      through: "ProductCollection", 
      foreignKey: "product_id",
      otherKey: "collection_id",
    });
    
    Product.belongsToMany(models.Category, { 
      through: "ProductCategory", 
      foreignKey: "product_id",
      otherKey: "category_id",
    });
  };

  return Product;
};