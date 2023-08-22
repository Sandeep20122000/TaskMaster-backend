const express = require('express')

const {
    createUser,
    getUsers,
    getUser,
    updateUserProperty
} = require('../controllers/userController')

const router = express.Router()

// get all user
router.get('/', getUsers)

// get user
router.post('/login', getUser)

//create a user
router.post('/createUser', createUser)

//update user
router.patch('/updateUser', updateUserProperty)


module.exports = router;