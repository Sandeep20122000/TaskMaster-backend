const User = require('../models/userModel')

const mongoose = require('mongoose')


//get all user

const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})

    res.status(200).json(users)
}

//get user
const getUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}



//post user
const createUser = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await User.create({username, email, password, tasks: []})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateUserProperty = async (req, res) => {
    const { userId, key, value } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { [key]: value }},
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUserProperty
}