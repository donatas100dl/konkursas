const {
    registerUser,
    login,
    getCurrentUser,
    getAllUsers,
    checkEmailTaken,
    checkUsernameTaken,
    // verifyEmail,
    // sendVerifyEmail,
  } = require('./userController.js');
  const express = require('express')
  const router = express.Router()
  const { protect } = require('../../middleware/authMiddleware')
  const { attachTransporter } = require('../../middleware/transporter')
  
  router.post('/', attachTransporter, registerUser)
  router.post('/login', login)
  router.get('/', protect, getCurrentUser)
  router.get('/all', getAllUsers)
  router.post('/exist/email', checkEmailTaken)
  router.post('/exist/username', checkUsernameTaken)
//   router.get('/verify/:token', verifyEmail)
//   router.post('/verify/email', attachTransporter, sendVerifyEmail)
  
  module.exports = router
  