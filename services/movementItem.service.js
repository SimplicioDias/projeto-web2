const MovementItem = require("../models/movementItem.model");

module.exports = {
    async getAll() {
        return MovementItem.find()
            .populate("movement_id")
            .populate("stock_id")
            .populate("product_id");
    },

    async getById(id) {
        return MovementItem.findById(id)
            .populate("movement_id")
            .populate("stock_id")
            .populate("product_id");
    },

    async create(data) {
        return MovementItem.create(data);
    },

    async update(id, data) {
        return MovementItem.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id) {
        return MovementItem.findByIdAndDelete(id);
    }
};
