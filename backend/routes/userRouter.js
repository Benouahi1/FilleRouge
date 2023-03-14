const express = require('express')
const router = express.Router()

const {loginUser, getUser,registerUser} = require('../controllers/userController')

router.post('/login',loginUser)
router.post('/register',registerUser)
router.post('/List/user',getUser)

module.exports = router
