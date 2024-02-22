const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token);
    try {
        const jwtResponse = jwt.verify(token,"supersecretekey12345")
        console.log(jwtResponse);  //it returns an object in which contains a secrete information and an iat which is an additional information (which is the time of jwt issued )
        req.payload = jwtResponse.userId
        next()
    } catch (err) {
        res.status(401).json('authorization failed')
        
    }
   
}
module.exports= jwtMiddleware 