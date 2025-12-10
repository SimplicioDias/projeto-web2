const multer = require("multer");
const path = require("path");
const fs = require("fs");

const tmpFolder = path.resolve(__dirname, "..", "tmp");
if (!fs.existsSync(tmpFolder)) fs.mkdirSync(tmpFolder);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tmpFolder);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
        return cb(new Error("Arquivo não permitido. Envie uma imagem."), false);
    }
    cb(null, true);
};

module.exports = multer({
    storage,
    fileFilter
});
