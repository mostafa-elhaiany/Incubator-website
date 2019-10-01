const jwt = require('jsonwebtoken')


function memberAuth(req,res,next) {
    
    const token = req.header('x-auth-token')
    
    //check token
    if(!token)
    {
       return res.status(401).json({
            status:'error',
            msg:'unautherized! Token doesnt exist'
        })
    }
    try{

        //verify token 
        const decoded = jwt.verify(token,process.env.jwtSecret)
        if(decoded.type!=='member' &&  decoded.type!=='highboard' && decoded.type!=='admin'){
            return res.status(401).json({
                status:'error',
                msg:'you must be a Member to do this'
            })
        }
        //add id to request
        req.user=decoded
        next();
    }catch(e){
        res.status(400).json({
            status:'error',
            msg:'unnautherized! Invalid token!'

        })
    }
}

module.exports = memberAuth