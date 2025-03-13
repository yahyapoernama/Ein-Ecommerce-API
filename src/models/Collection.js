module.exports = (sequelize, DataTypes) => {
    const Collection = sequelize.define(
        "Collection",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            store_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Collection",
            tableName: "collections",
            timestamps: true,
            paranoid: true,
            underscored: true,
        }
    );

    Collection.associate = (models) => {
        Collection.belongsTo(models.User, {
            foreignKey: 'store_id',
            onDelete: 'CASCADE',
        });

        Collection.belongsToMany(models.Product, {
            through: "ProductCollection",
            foreignKey: "collection_id",
            otherKey: "product_id",
        });
    };

    return Collection;
};

