const { Category } = require("../models");

module.exports = {
    async index(req, res) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const category = await Category.findByPk(req.params.id);
            return res.json(category);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const category = await Category.create(req.body);
            return res.status(201).json(category);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            await Category.update(req.body, { where: { id: req.params.id } });
            const updated = await Category.findByPk(req.params.id);
            return res.json(updated);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            await Category.destroy({ where: { id: req.params.id } });
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};
