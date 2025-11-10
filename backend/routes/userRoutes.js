const express=require('express');
const { loginUser, profileUser, registerUser}=require('../controllers/userController');
const authUser = require('../middleware/authMiddleware');
const router=express.Router();


router.post('/register', registerUser);
router.post('/login',loginUser);
router.get('/profile',authUser,profileUser);


module.exports = router;
