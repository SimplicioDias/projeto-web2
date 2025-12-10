const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ error: "Token não enviado" });

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token)
        return res.status(401).json({ error: "Token inválido" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token expirado ou inválido" });
    }
};
