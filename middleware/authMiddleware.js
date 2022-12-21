//retrive id from token
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req,res,next) =>{
    //cut off options request
    if(req.method === "OPTIONS") {//TODO: check info about options method
        return next()
    }

    try {
        //get token from header
        const authHeader = req.headers.authorization //"Bearer TOKEN"
        token = authHeader.split(' ')[1] 
        if (!token) {
            return res.status(401).json({message: 'User is not authorized' });
        }
        const decodedToken = jwt.verify(token, config.get('jwtSecret'));
        req.decodedUserId = decodedToken.userId;
        next();

    } catch (error) {
        res.status(401).json({message: 'User is not authorized' });
    }
}