// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv').config();

// const authHandler = async (req, res, next) => {
//     let token;
//     const authHeader = req.headers.Authorization || req.headers.authorization;
//     console.log('7', authHeader)
//     if (authHeader && authHeader.startsWith('Bearer')) {
//         token = authHeader.split(' ')[1];
//         console.log('10', token, process.env.ACCESS_TOKEN_SECRET)
//         await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, deocde) => {
//             if (error) {
//                 console.log('User is not authenticated');
//                 const err = new Error('Unauthorized user')
//                 res.status(401);
//                 return next(err)
//             }
//             console.log('decode', decode)
//             req.user = deocde.user;
//             next();
//         })
//     } else {
//         console.log('User  not authenticated');
//         const err = new Error('Unauthorized user')
//         res.status(401);
//         return next(err)
//     }

// }

// module.exports = authHandler;


const jwt = require('jsonwebtoken');
require('dotenv').config();

const authHandler = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log('Auth Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401);
        return next(new Error('Unauthorized user'));
    }

    const token = authHeader.split(' ')[1];
    console.log('47', token)

    try {

        const data = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        console.log('Decoded user:', data);
        req.user = data.user;
        console.log(req.user)
        next();
    } catch (err) {
        res.status(401);
        return next(new Error('Unauthorized userss'));
    }
};

module.exports = authHandler;
