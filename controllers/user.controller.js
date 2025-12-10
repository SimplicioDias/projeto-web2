const User = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports = {
  async list(req, res) {
    const users = await User.find();
    return res.json(users);
  },

  async create(req, res) {
    try {
      const { name, email, password } = req.body;

      const hash = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name,
        email,
        password_hash: hash
      });

      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
