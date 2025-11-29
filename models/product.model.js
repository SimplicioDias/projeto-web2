module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        sku: { type: DataTypes.STRING(50), allowNull: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        category_id: { type: DataTypes.INTEGER },
        supplier_id: { type: DataTypes.INTEGER },
        markup: { type: DataTypes.DECIMAL(5,2), defaultValue: 1.50 },
        cost_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
        selling_price: { type: DataTypes.DECIMAL(10,2), allowNull: false } // STORED computed column
    }, {
        tableName: 'products',
        timestamps: false
    });

    Product.associate = (models) => {
        Product.belongsTo(models.Category, { foreignKey: 'category_id' });
        Product.belongsTo(models.Supplier, { foreignKey: 'supplier_id' });
        Product.hasMany(models.Stock, { foreignKey: 'product_id' });
        Product.hasMany(models.MovementItem, { foreignKey: 'product_id' });
        Product.hasMany(models.PriceAdjustment, { foreignKey: 'product_id' });
    };

    return Product;
};
