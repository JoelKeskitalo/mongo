const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController') // fixa importen 

// base: http://localhost:6000/api/users

router.post('/', userController.createUser)
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.updateUserById)
router.delete('/:id', userController.deleteUserById)

module.exports = router