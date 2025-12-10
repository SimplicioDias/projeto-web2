const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  name: { type: String, maxlength: 100 },
  cnpj_cpf: { type: String, maxlength: 20 },
  contact: { type: String, maxlength: 30 }
});

module.exports = mongoose.model("Supplier", SupplierSchema);
