const Category = require("../models/category.model");

module.exports = {
    async getAll() {
        return Category.find();
    },

    async getById(id) {
        return Category.findById(id);
    },

    async create(data) {
        return Category.create(data);
    },

    async update(id, data) {
        return Category.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id) {
        return Category.findByIdAndDelete(id);
    }
};
