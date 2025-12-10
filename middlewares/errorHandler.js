module.exports = (err, req, res, next) => {
    console.error("ERRO INTERNNO:", err);

    return res.status(500).json({
        error: "Erro interno. Tente novamente.",
        details: err.message
    });
};
