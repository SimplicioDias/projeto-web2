module.exports = (sequelize, DataTypes) => {
    const Stock = sequelize.define('Stock', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        warehouse_id: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        last_update: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'stocks',
        timestamps: false
    });

    Stock.associate = (models) => {
        Stock.belongsTo(models.Product, { foreignKey: 'product_id' });
        Stock.belongsTo(models.Warehouse, { foreignKey: 'warehouse_id' });
        // Stock.hasMany(models.StockMovement, { foreignKey: 'stock_id' }); // Comentado: StockMovement não tem stock_id
    };

    return Stock;
};
