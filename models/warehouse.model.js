module.exports = (sequelize, DataTypes) => {
    const Warehouse = sequelize.define('Warehouse', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        address_reference: { type: DataTypes.STRING(50), allowNull: true }
    }, {
        tableName: 'warehouses',
        timestamps: false
    });

    Warehouse.associate = (models) => {
        Warehouse.hasMany(models.Stock, {
            foreignKey: 'warehouse_id'
        });
    };

    return Warehouse;
};
