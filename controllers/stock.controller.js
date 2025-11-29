const { Stock, Product, Warehouse } = require("../models");

module.exports = {
    async index(req, res) {
        try {
            const stocks = await Stock.findAll({
                include: [
                    { model: Product },
                    { model: Warehouse }
                ]
            });

            return res.json(stocks);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const stock = await Stock.findByPk(req.params.id, {
                include: [
                    { model: Product },
                    { model: Warehouse }
                ]
            });

            return res.json(stock);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

   /*  async store(req, res) {
        try {
            const stock = await Stock.create(req.body);
            return res.status(201).json(stock);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }, */

    /* async update(req, res) {
        try {
            await Stock.update(req.body, { where: { id: req.params.id } });
            const updated = await Stock.findByPk(req.params.id);
            return res.json(updated);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }, */

    /* async destroy(req, res) {
        try {
            await Stock.destroy({ where: { id: req.params.id } });
            return res.status(204).send();
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } */
};
