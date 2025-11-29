const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

module.exports = {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res.status(401).json({ error: 'Usuário não encontrado' });

      const ok = await bcrypt.compare(password, user.password_hash);
      if (!ok)
        return res.status(401).json({ error: 'Senha incorreta' });

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
      return res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
