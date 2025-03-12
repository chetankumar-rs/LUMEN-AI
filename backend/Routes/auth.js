const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
 

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  const {name, email, password} = req.body;
  // console.log(role);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name,email,password});
    await user.save();

    res.status(201).json({ message: 'User registered successfully',
        name:name


     });
      



  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Create a user object to send back, excluding sensitive information
    // console.log(user)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
       
    };

    res.status(200).json({ message: 'Login successful', user: userResponse,token});
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;