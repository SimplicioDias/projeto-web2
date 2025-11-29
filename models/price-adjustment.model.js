module.exports = (sequelize, DataTypes) => {
    const PriceAdjustment = sequelize.define('PriceAdjustment', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        product_id: { type: DataTypes.INTEGER },
        old_price: { type: DataTypes.DECIMAL(10,2) },
        new_price: { type: DataTypes.DECIMAL(10,2) },
        user_id: { type: DataTypes.INTEGER },
        date_adjustments: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    }, {
        tableName: 'price_adjustments',
        timestamps: false
    });

    PriceAdjustment.associate = (models) => {
        PriceAdjustment.belongsTo(models.Product, { foreignKey: 'product_id' });
        PriceAdjustment.belongsTo(models.User, { foreignKey: 'user_id' });
    };

    return PriceAdjustment;
};
