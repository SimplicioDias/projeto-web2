const fs = require("fs");
const Product = require("../models/product.model");
const cloudinary = require("../config/cloudinary");

module.exports = {
  async index(req, res) {
    try {
      const products = await Product.find()
        .populate("category_id")
        .populate("supplier_id");
      return res.json(products);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      console.log(
        "DEBUG create - req.file:",
        !!req.file,
        "req.body.image_url:",
        !!req.body.image_url
      );

      let imageUrl = null;
      let imagePublicId = null;

      // 1) Se veio arquivo multipart (upload via form)
      if (req.file && req.file.path) {
        try {
          const uploaded = await cloudinary.uploader.upload(req.file.path, {
            folder: "banco-web2/products",
          });
          imageUrl = uploaded.secure_url;
          imagePublicId = uploaded.public_id;
          console.log("DEBUG create - uploaded file:", uploaded.public_id);
        } catch (err) {
          console.error("ERROR cloudinary upload file:", err);
          return res
            .status(500)
            .json({ error: "Falha no upload da imagem (arquivo)." });
        } finally {
          if (req.file && req.file.path && fs.existsSync(req.file.path))
            fs.unlinkSync(req.file.path);
        }
      }
      // 2) Se veio image_url no JSON, faça Cloudinary fetch (ou apenas armazene a URL, ver comentário)
      else if (req.body.image_url) {
        try {
          const uploaded = await cloudinary.uploader.upload(
            req.body.image_url,
            { folder: "banco-web2/products" }
          );
          imageUrl = uploaded.secure_url;
          imagePublicId = uploaded.public_id;
          console.log("DEBUG create - uploaded url:", uploaded.public_id);
        } catch (err) {
          console.error("ERROR cloudinary upload url:", err);
          return res
            .status(500)
            .json({ error: "Falha no upload da imagem (URL)." });
        }
      }

      const newProduct = await Product.create({
        ...req.body,
        imageUrl,
        imagePublicId,
      });

      return res.status(201).json(newProduct);
    } catch (err) {
      console.error("ERROR create product:", err);
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product)
        return res.status(404).json({ error: "Produto não encontrado" });

      console.log(
        "DEBUG update - req.file:",
        !!req.file,
        "req.body.image_url:",
        !!req.body.image_url
      );

      // Se veio novo arquivo multipart
      if (req.file && req.file.path) {
        let newUrl = null;
        let newPublicId = null;
        try {
          const uploaded = await cloudinary.uploader.upload(req.file.path, {
            folder: "banco-web2/products",
          });
          newUrl = uploaded.secure_url;
          newPublicId = uploaded.public_id;
          console.log("DEBUG update - uploaded file:", uploaded.public_id);
        } catch (err) {
          console.error("ERROR cloudinary upload file:", err);
          return res
            .status(500)
            .json({ error: "Falha no upload da imagem (arquivo)." });
        } finally {
          if (req.file && req.file.path && fs.existsSync(req.file.path))
            fs.unlinkSync(req.file.path);
        }

        // Remove antiga imagem do Cloudinary se existir
        if (product.imagePublicId) {
          cloudinary.uploader.destroy(product.imagePublicId).catch((e) => {
            console.warn("WARN failed to delete old image:", e.message);
          });
        }

        req.body.imageUrl = newUrl;
        req.body.imagePublicId = newPublicId;
      }
      // Se veio image_url (JSON) — faça upload por fetch para Cloudinary e substitua
      else if (req.body.image_url) {
        try {
          const uploaded = await cloudinary.uploader.upload(
            req.body.image_url,
            { folder: "banco-web2/products" }
          );
          console.log("DEBUG update - uploaded url:", uploaded.public_id);

          if (product.imagePublicId) {
            cloudinary.uploader.destroy(product.imagePublicId).catch(() => {});
          }

          req.body.imageUrl = uploaded.secure_url;
          req.body.imagePublicId = uploaded.public_id;
        } catch (err) {
          console.error("ERROR cloudinary upload url:", err);
          return res
            .status(500)
            .json({ error: "Falha no upload da imagem (URL)." });
        }
      }

      const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.json(updated);
    } catch (err) {
      console.error("ERROR update product:", err);
      return res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      // Deleta imagem do Cloudinary
      if (product.imageUrl) {
        const public_id = product.imageUrl.split("/").pop().split(".")[0];
        await uploadService.deleteImage(`banco-web2/products/${public_id}`);
      }

      await Product.findByIdAndDelete(id);
      return res.json({ message: "Produto deletado com sucesso" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
