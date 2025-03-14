module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define(
      "Store",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        user_id: {
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
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        logo: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        banner: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM('pending', 'active', 'inactive', 'suspended'),
        }
      },
      {
        sequelize,
        modelName: "Store",
        tableName: "stores",
        timestamps: true,
        paranoid: true,
        underscored: true,
      }
    );
  
    Store.associate = (models) => {
      Store.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    };
  
    return Store;
  };
  
  