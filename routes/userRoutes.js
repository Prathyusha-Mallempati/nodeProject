const express = require('express')
const app = express();
const router = require('express').Router();
const authHandler = require('../middleWare/authHandler')
const { register, login, currentUser } = require("../controllers/userController")



router.post('/register', register)

router.post('/login', login)
router.get('/current', authHandler, currentUser)



module.exports = router