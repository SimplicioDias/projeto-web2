const { PriceAdjustment } = require("../models");

module.exports = {
    async index(req, res) {
        try {
            const logs = await PriceAdjustment.findAll({
                order: [["date_adjustments", "DESC"]]
            });

            return res.json(logs);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async show(req, res) {
        try {
            const log = await PriceAdjustment.findByPk(req.params.id);
            return res.json(log);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};
