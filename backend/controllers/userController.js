const bycrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');
const { JWT_SECRECT } = require('../config/env.config');
const registerUser=async(req, res)=>{
  try{
        if (!req.body) {
        return res.status(400).json({ success: false, message: 'Missing request body' });
    }

    const fullName = req.body.fullName;
    const email = req.body.email;
    const accountType=req.body.accountType;
    const password=req.body.password;

    if(!fullName || !email || !accountType || !password){
      return res.status(400).json({message: 'All fields are req!!'});
    }
    const existingUser = await User.findOne({ email });
      if(existingUser){
        return res.status(400).json({message: 'User with this email already exists!'});
      }

    const user=new User({
      fullName: fullName,
      email: email,
      accountType: accountType,
      password: password
    })
    const salt=await bycrypt.genSalt(10);
    user.password=await bycrypt.hash(password, salt);

    await user.save();
    res.status(201).json({message:'User registered successfully'});

  }catch(error){
    console.error('Error registering user: ',error);
    res.status(500).json({message:'Server Error'});
  }
};

const loginUser=async(req, res)=>{
  try{
    const {email, password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({message:'Invalid credentials'});
    }
    const isMatch=await bycrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: 'Invalid credentials'});
    }
    const payload={user:{id:user.id,accountType: user.accountType}};
    jwt.sign(
      payload, JWT_SECRECT,
      {expiresIn:'5h'},
      (err, token)=>{
        if(err) throw err;
        res.status(200).json({
          token,
          user:{
            id:user.id,
            fullname:user.fullName,
            email:user.email,
            accountType:user.accountType,
          }
        })
      }
    )
  }catch(error){
    console.error('Error logging in : ',error);
    res.status(500).json({message: 'Server Error'});
  }
};

const profileUser=async(req, res)=>{
  try{
    const user=await User.findById(req.user.id).select('-password');
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }
    res.status(200).json({
      message: 'Welcome to your dashboard!',
      user,
    });
  }catch(error){
    console.error('Error fetching profile: ',error);
    res.status(500).json({message: 'Server error'});
  }
};

const logoutUser=async(req, res)=>{
  try{

  }catch(error){

  }
}

module.exports={
  registerUser,
  loginUser,
  profileUser, 
  logoutUser
};