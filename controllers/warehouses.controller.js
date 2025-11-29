const { Warehouse } = require("../models");

module.exports = {
    async index(req, res) {
        try {
            const warehouses = await Warehouse.findAll();
            return res.json(warehouses);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const warehouse = await Warehouse.findByPk(req.params.id);
            return res.json(warehouse);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async store(req, res) {
        try {
            const warehouse = await Warehouse.create(req.body);
            return res.status(201).json(warehouse);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async update(req, res) {
        try {
            await Warehouse.update(req.body, { where: { id: req.params.id } });
            const updated = await Warehouse.findByPk(req.params.id);
            return res.json(updated);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async destroy(req, res) {
        try {
            await Warehouse.destroy({ where: { id: req.params.id } });
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};
