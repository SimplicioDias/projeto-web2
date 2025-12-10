const mongoose = require("mongoose");

async function connectDB() {
  try {
    const mongoURI = process.env.MONGO_URI;
    
    if (!mongoURI) {
      throw new Error("MONGO_URI não está definida nas variáveis de ambiente");
    }

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("MongoDB Atlas conectado com sucesso!");
    console.log(`Conectado ao banco: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB Atlas:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
