module.exports = (sequelize, DataTypes) => {
    const ProductCollection = sequelize.define(
        "ProductCollection",
        {
            product_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "products",
                    key: "id",
                },
            },
            collection_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "collections",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "ProductCollection",
            tableName: "product_collections",
            timestamps: true,
            underscored: true,
        }
    );

    ProductCollection.associate = (models) => {
        ProductCollection.belongsTo(models.Product, {
            foreignKey: "product_id",
            onDelete: "CASCADE",
        });

        ProductCollection.belongsTo(models.Collection, {
            foreignKey: "collection_id",
            onDelete: "CASCADE",
        });
    };

    return ProductCollection;
}