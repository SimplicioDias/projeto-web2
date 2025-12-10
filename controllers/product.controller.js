const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary");

module.exports = {
  async list(req, res) {
    try {
      const products = await Product.find().populate("category_id").populate("supplier_id");
      return res.json(products);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async get(req, res) {
    try {
      const product = await Product.findById(req.params.id)
        .populate("category_id")
        .populate("supplier_id");

      if (!product) return res.status(404).json({ error: "Produto não encontrado" });

      return res.json(product);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      let imageUrl = null;

      if (req.file) {
        const uploaded = await cloudinary.uploader.upload(req.file.path);
        imageUrl = uploaded.secure_url;
      }

      const newProduct = await Product.create({
        ...req.body,
        imageUrl
      });

      return res.status(201).json(newProduct);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!updated) return res.status(404).json({ error: "Produto não encontrado" });

      return res.json(updated);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      const deleted = await Product.findByIdAndDelete(req.params.id);

      if (!deleted) return res.status(404).json({ error: "Produto não encontrado" });

      return res.json({ ok: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
