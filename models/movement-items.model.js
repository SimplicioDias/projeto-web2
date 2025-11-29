module.exports = (sequelize, DataTypes) => {
    const MovementItem = sequelize.define('MovementItem', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        movement_id: { type: DataTypes.INTEGER },
        stock_id: { type: DataTypes.INTEGER },
        product_id: { type: DataTypes.INTEGER },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        unit_cost: { type: DataTypes.DECIMAL(10,2) },
        total_value: { type: DataTypes.DECIMAL(10,2) }
    }, {
        tableName: 'movement_items',
        timestamps: false
    });

    MovementItem.associate = (models) => {
        MovementItem.belongsTo(models.StockMovement, { foreignKey: 'movement_id' });
        MovementItem.belongsTo(models.Product, { foreignKey: 'product_id' });
        MovementItem.belongsTo(models.Stock, { foreignKey: 'stock_id' });
    };

    return MovementItem;
};
