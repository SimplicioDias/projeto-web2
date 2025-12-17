// services/upload.service.js
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

module.exports = {
  async uploadImage(filePath, folder = "products") {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `banco-web2/${folder}`,
        resource_type: "auto",
        quality: "auto:good",
      });

      // Remove arquivo temporário após upload bem-sucedido
      fs.unlinkSync(filePath);

      return {
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
      };
    } catch (err) {
      // Limpa arquivo em caso de erro
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      throw new Error(`Erro ao fazer upload: ${err.message}`);
    }
  },

  async deleteImage(public_id) {
    try {
      await cloudinary.uploader.destroy(public_id);
      return { message: "Imagem deletada com sucesso" };
    } catch (err) {
      throw new Error(`Erro ao deletar imagem: ${err.message}`);
    }
  },

  async optimizeImageUrl(url, width = 300, height = 300) {
    // Gera URL otimizada da Cloudinary
    return url.replace("/upload/", `/upload/w_${width},h_${height},c_fill/`);
  },
};
