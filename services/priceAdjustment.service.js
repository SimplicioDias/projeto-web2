const PriceAdjustment = require("../models/priceAdjustment.model");

module.exports = {
    async getAll() {
        return PriceAdjustment.find()
            .populate("product_id")
            .populate("user_id");
    },

    async getById(id) {
        return PriceAdjustment.findById(id)
            .populate("product_id")
            .populate("user_id");
    },

    async create(data) {
        return PriceAdjustment.create(data);
    },

    async delete(id) {
        return PriceAdjustment.findByIdAndDelete(id);
    }
};
