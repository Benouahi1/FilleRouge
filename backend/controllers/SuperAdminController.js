const { text } = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const AdminSuper = require('../models/AdminSuperModel')









const registerAdminSuper = asyncHandler(async(req,res)=>{

  // methode pour creer une chaine e characteres aleatoire!
  const characteres = "0123456789abcdefjhigklmnopqrstuvwxyzABCDEFJHIGKLMNOPQRSTUVWYZ";
  let activationCode = "";
  for(let i = 0; i < 25; i++){
    activationCode  += characteres[Math.floor(Math.random() * characteres.length)]
  }
    const {AdminSuperName, email, password} = req.body
    if(!AdminSuperName || !email || !password ){
    res.status(400) 
    throw new Error('Please add all fields')
    }
    
    const AdminSuperExists = await AdminSuper.findOne({email});
    if(AdminSuperExists){
        throw new Error('AdminSuper already exists')
    } 
    //  salt is a random string that makes the hash unpredictable
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash( password, salt);
    const AdminSuper = await AdminSuper.create({
      AdminSuperName,
        email,
        password: hashedPassword, 
      
    })
    if(AdminSuper){
        res.status(201).json({
        _id : AdminSuper.id,
        AdminSuperName : AdminSuperName,
        email : email})
       } else{
    res.status(400) 
    throw new Error('Invalid AdminSuper data');
    }
   
    
})

const loginAdminSuper = asyncHandler(async (req, res) => {
    const  email= req.body.email
    const password = req.body.password
    const AdminSuper = await AdminSuper.findOne({ email })

    if (AdminSuper && (await bcrypt.compare(password, AdminSuper.password))) {
      res.json({
        AdminSuper:AdminSuper.role,
        token: generateToken(AdminSuper._id),
      })
    } else {
      res.status(400)
      console.log('Erour')
     
    }
  })


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, "abc123", {
      expiresIn: '1d',
    })
  }

module.exports = {loginAdminSuper, registerAdminSuper}