const Stock = require("../models/stock.model");

module.exports = {
    async getAll() {
        return Stock.find()
            .populate("product_id")
            .populate("warehouse_id");
    },

    async getById(id) {
        return Stock.findById(id)
            .populate("product_id")
            .populate("warehouse_id");
    },

    async create(data) {
        return Stock.create(data);
    },

    async update(id, data) {
        return Stock.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id) {
        return Stock.findByIdAndDelete(id);
    }
};
