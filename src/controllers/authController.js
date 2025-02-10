const { Op } = require('sequelize'); // Tambahkan ini
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');
const { User } = require('../models');

// Register
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.time('findUser');
    const existingUserByUsername = await User.findOne({
      where: { username },
    });
    const existingUserByEmail = await User.findOne({
      where: { email },
    });
    console.timeEnd('findUser');

    if (existingUserByUsername && existingUserByEmail) {
      return res.status(400).json({
        statusCode: 400,
        type: 'Validation Error',
        message: 'Username and email already exists',
      });
    } else if (existingUserByUsername) {
      return res.status(400).json({
        statusCode: 400,
        type: 'Validation Error',
        message: 'Username already exists',
      });
    } else if (existingUserByEmail) {
      return res.status(400).json({
        statusCode: 400,
        type: 'Validation Error',
        message: 'Email already exists',
      });
    }

    console.time('hashPassword');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.timeEnd('hashPassword');

    console.time('createUser');
    const newUser = await User.create({ username, email, password: hashedPassword });
    console.timeEnd('createUser');

    const token = generateToken(newUser.id);
    res.status(201).json({
      statusCode: 201,
      type: 'Success',
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      type: 'Server Error',
      message: 'Server error',
      error: err.message,
    });
  }
};

// Login
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({
        statusCode: 400,
        type: 'Validation Error',
        message: 'Invalid username or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        statusCode: 400,
        type: 'Validation Error',
        message: 'Invalid username or password',
      });
    }

    const token = generateToken(user.id);
    res.status(200).json({
      statusCode: 200,
      type: 'Success',
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      type: 'Server Error',
      message: 'Server error',
      error: err.message,
    });
  }
};

module.exports = { register, login };