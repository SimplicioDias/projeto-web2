require('dotenv').config();
const express = require("express");
const app = express();
const routes = require("./routes/index.routes");

app.use(express.json());

// ROTAS
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});
