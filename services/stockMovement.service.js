const StockMovement = require("../models/stockMovement.model");

module.exports = {
    async getAll() {
        return StockMovement.find();
    },

    async getById(id) {
        return StockMovement.findById(id);
    },

    async create(data) {
        return StockMovement.create(data);
    },

    async update(id, data) {
        return StockMovement.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id) {
        return StockMovement.findByIdAndDelete(id);
    }
};
