const { Supplier } = require("../models");

module.exports = {
    async index(req, res) {
        try {
            const suppliers = await Supplier.findAll();
            return res.json(suppliers);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const supplier = await Supplier.findByPk(req.params.id);
            return res.json(supplier);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show2(req, res) {
        try {
            const supplier = await Supplier.findOne({
                where: {
                    name : req.params.name
                }
            });
            return res.json(supplier);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const supplier = await Supplier.create(req.body);
            return res.status(201).json(supplier);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            await Supplier.update(req.body, { where: { id: req.params.id } });
            const updated = await Supplier.findByPk(req.params.id);
            return res.json(updated);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            await Supplier.destroy({ where: { id: req.params.id } });
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};
