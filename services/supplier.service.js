const Supplier = require("../models/supplier.model");

module.exports = {
    async getAll() {
        return Supplier.find();
    },

    async getById(id) {
        return Supplier.findById(id);
    },

    async create(data) {
        return Supplier.create(data);
    },

    async update(id, data) {
        return Supplier.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id) {
        return Supplier.findByIdAndDelete(id);
    }
};
