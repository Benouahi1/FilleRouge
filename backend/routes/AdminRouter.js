const express = require('express')
const router = express.Router()

const {loginAdmin, getAdmin,registerAdmin} = require('../controllers/userController')

router.post('/login',loginAdmin)
router.post('/register',registerAdmin)
router.post('/List/Admin',getAdmin)

module.exports = router
