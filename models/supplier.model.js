module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define('Supplier', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(100), allowNull: true },
        cnpj_cpf: { type: DataTypes.STRING(20), allowNull: true },
        contact: { type: DataTypes.STRING(30), allowNull: true }
    }, {
        tableName: 'suppliers',
        timestamps: false
    });

    Supplier.associate = (models) => {
        Supplier.hasMany(models.Product, {
            foreignKey: 'supplier_id'
        });
    };

    return Supplier;
};
