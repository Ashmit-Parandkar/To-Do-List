const user = require('../models/user.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
    path: './config.env'
})

const registerUser = async (req,res)=>{

    const {name, email, password} = req.body;    // We have to use express.json() middleware to access req.body

    let oneUser = await user.findOne({email});

    if(oneUser)
    {
        return res.status(404).json({
            success: false,
            message: "User Already Exists"
        });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedPassword = password;

    oneUser = await user.create({
        name,
        email,
        password: hashedPassword
    });
    
    const token = jwt.sign({ _id: oneUser._id }, process.env.JWT_SECRET);

    res.status(201).cookie("token",token,{
        httpOnly: true,
        maxAge: 15*60*1000
    })
    // .json({
    //     success: true,
    //     message: 'Registration Successful'
    // })
    res.redirect('/api/v1/users/home');
    
}

const loginUser = async (req,res)=>{

    const {email, password} = req.body;
    //  As we have set 'select: false' in user model, we have to manually select it
    const oneUser = await user.findOne({ email }).select('+password');
    
    if(!oneUser)
    {
        return res.status(404).json({
            success: false,
            message: "User Not Found"
        })
    }

    const isMatch = await bcrypt.compare(password,oneUser.password)

    if(!isMatch)
    {
        return res.status(404).json({
            success: false,
            message: "Wrong Password"
        })
    }

    const token = jwt.sign( {_id: oneUser._id}, process.env.JWT_SECRET);

    res.status(200).cookie("token",token,{
        httpOnly: true,
        maxAge: 15*60*1000
    })
    // .json({
    //     success: true,
    //     message: `Welcome ${oneUser.name}, login successful`
    // })
    res.redirect('/api/v1/users/home');

}

const getMyProfile = async (req,res) =>{

    res.status(200)
    // .json({
    //     success: true,
    //     message: req.user
    // })
    res.render('profile')
}

const logoutUser = async (req,res) =>{

    res.status(200).cookie("token",null,{
        expires: new Date(Date.now())
    })
    // .json({
    //     success: true,
    //     message: "Logout Successful"
    // })
    res.redirect('/api/v1/users/login')

}

const getRegisterPage = async (req,res) =>{
    res.render('register')
}

const getLoginPage = async (req,res) =>{
    res.render('login')
}

const getHomePage = async (req,res) =>{
    res.redirect('/api/v1/tasks/all')
}

module.exports = {registerUser, loginUser, logoutUser, getMyProfile, getRegisterPage, getLoginPage, getHomePage}