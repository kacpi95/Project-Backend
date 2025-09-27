const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { login, password, avatar, numberPhone } = req.body;
  try {
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const userLogin = await User.findOne({ login });
      if (userLogin) {
        return res
          .status(409)
          .json({ message: 'User with this login already exists' });
      }
      const newUser = new User({
        login,
        password: await bcrypt.hash(password, 12),
      });
      await newUser.save();
      res.status(201).json({ message: `User created ${newUser.login}` });
    } else {
      res.status(400).json({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { login, password } = req.body;
  try {
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(401).json({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compare(password, user.password)) {
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Login or password are incorrect' });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
