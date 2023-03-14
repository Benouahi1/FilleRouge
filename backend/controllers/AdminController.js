const { text } = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../models/AdminModel')


const getAdmin =asyncHandler( async (req, res) => {
  try {
    const Admin = await Admin.find();
    res.json(Admin);
  } catch (err) {
    res.json({ message: err });
  }
});






const registerAdmin = asyncHandler(async(req,res)=>{

  // methode pour creer une chaine e characteres aleatoire!
  const characteres = "0123456789abcdefjhigklmnopqrstuvwxyzABCDEFJHIGKLMNOPQRSTUVWYZ";
  let activationCode = "";
  for(let i = 0; i < 25; i++){
    activationCode  += characteres[Math.floor(Math.random() * characteres.length)]
  }
    const {AdminName, email, password} = req.body
    if(!AdminName || !email || !password ){
    res.status(400) 
    throw new Error('Please add all fields')
    }
    
    const AdminExists = await Admin.findOne({email});
    if(AdminExists){
        throw new Error('Admin already exists')
    } 
    //  salt is a random string that makes the hash unpredictable
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash( password, salt);
    const Admin = await Admin.create({
      AdminName,
        email,
        password: hashedPassword, 
      
    })
    if(Admin){
        res.status(201).json({
        _id : Admin.id,
        AdminName : AdminName,
        email : email})
       } else{
    res.status(400) 
    throw new Error('Invalid Admin data');
    }
   
    
})

const loginAdmin = asyncHandler(async (req, res) => {
    const  email= req.body.email
    const password = req.body.password
    const Admin = await Admin.findOne({ email })

    if (Admin && (await bcrypt.compare(password, Admin.password))) {
      res.json({
        Admin:Admin.role,
        token: generateToken(Admin._id),
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

module.exports = {loginAdmin, getAdmin,registerAdmin}