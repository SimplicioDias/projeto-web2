module.exports = (sequelize, DataTypes) => {
    const StockMovement = sequelize.define('StockMovement', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        movement_type: { type: DataTypes.ENUM('ENTRADA', 'SAIDA', 'TRANSFERENCIA'), allowNull: false },
        // stock_id: { type: DataTypes.INTEGER },
        // quantity: { type: DataTypes.INTEGER, allowNull: false },
        // unit_cost: { type: DataTypes.DECIMAL(10,2), allowNull: false },
        // total_value: { type: DataTypes.DECIMAL(10,2) },
        movement_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        description: { type: DataTypes.TEXT }
    }, {
        tableName: 'stock_movements',
        timestamps: false
    });

    StockMovement.associate = (models) => {
        // StockMovement.belongsTo(models.Stock, { foreignKey: 'stock_id' });
        StockMovement.hasMany(models.MovementItem, { foreignKey: 'movement_id' });
    };

    return StockMovement;
};
