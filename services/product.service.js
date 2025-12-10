const Product = require("../models/product.model");

module.exports = {
    async getAll() {
        return Product.find()
            .populate("category_id")
            .populate("supplier_id");
    },

    async getById(id) {
        return Product.findById(id)
            .populate("category_id")
            .populate("supplier_id");
    },

    async create(data) {
        return Product.create(data);
    },

    async update(id, data) {
        return Product.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id) {
        return Product.findByIdAndDelete(id);
    }
};
