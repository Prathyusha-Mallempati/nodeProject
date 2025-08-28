const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config();


//POST
// /api/v1/register
//public
const register = async (req, res, next) => {
    console.log('Register')
    const { userName, email, password } = req.body
    if (!userName || !email || !password) {
        res.status(400);
        const error = new Error('All fields are mandatory')
        return next(error)
    }
    const isEmailExist = await User.findOne({ email })
    console.log('isEmailExist', isEmailExist)
    if (isEmailExist) {
        res.status(400);
        const error = new Error('Email already exists')
        return next(error)
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword', hashedPassword)
    const createdUser = await User.create({
        userName, email, password: hashedPassword
    })
    if (createdUser) {
        return res.json({ _id: createdUser.id, email: createdUser.email }).status(201)
    } else {
        res.status(400);
        const error = new Error('Something went wrong')
        return next(error)
    }
}

//POST
// /api/v1/register
//public
const login = async (req, res, next) => {
    console.log('Login')
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        const error = new Error('All fields are mandatory')
        return next(error)
    }
    const userInfo = await User.findOne({ email })
    console.log('USERINFO', userInfo)
    const isPwdCorrect = bcrypt.compare(password, userInfo.password)
    if (userInfo && isPwdCorrect) {
        const accessToken = await jwt.sign({
            user: {
                userName: userInfo.userName,
                email: userInfo.email,
                id: userInfo.id,
                role: userInfo.role
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "300m" }
        );

        console.log('accessToken',accessToken)

        res.json({accessToken: accessToken})

    } else {
        res.status(400);
        const error = new Error('Something went wrong!')
        return next(error)
    }


}

//POST
// /api/v1/register
//private
const currentUser = async (req, res, next) => {
    const {email} = req.user
    console.log('82', email)
    const currentUser = await User.findOne({email})
    console.log('84', currentUser)
    if (!currentUser) {
        res.status(400);
        const error = new Error('User not found')
        return next(error)
    }

    res.json(currentUser)
}

module.exports = { register, login, currentUser }

