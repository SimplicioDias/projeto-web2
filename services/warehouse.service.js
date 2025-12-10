const Warehouse = require("../models/warehouse.model");

module.exports = {
    async getAll() {
        return Warehouse.find();
    },

    async getById(id) {
        return Warehouse.findById(id);
    },

    async create(data) {
        return Warehouse.create(data);
    },

    async update(id, data) {
        return Warehouse.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id) {
        return Warehouse.findByIdAndDelete(id);
    }
};
