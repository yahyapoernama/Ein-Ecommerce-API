const { Op } = require('sequelize'); // Tambahkan ini
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');
const { User } = require('../models');

// Register
const register = async (req, res) => {
  const { username, email, password, first_name, last_name } = req.body;

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
    const newUser = await User.create({
      username, email, password: hashedPassword, first_name, last_name
    });
    console.timeEnd('createUser');

    const token = generateToken(newUser.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax"
    });
    
    res.status(201).json({
      statusCode: 201,
      type: 'Success',
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax"
    });

    res.status(200).json({
      statusCode: 200,
      type: 'Success',
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
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