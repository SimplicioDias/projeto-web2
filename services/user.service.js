const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports = {
    async getAll() {
        return User.find();
    },

    async getById(id) {
        return User.findById(id);
    },

    async create(data) {
        const password_hash = await bcrypt.hash(data.password, 10);

        return User.create({
            name: data.name,
            email: data.email,
            password_hash
        });
    },

    async delete(id) {
        return User.findByIdAndDelete(id);
    }
};
