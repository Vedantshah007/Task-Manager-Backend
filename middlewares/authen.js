const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req,res,next)=>{
    // console.log('authen middleware')
    // next()
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decode = jwt.verify(token,'vedantishardworking')
         const user = await User.findOne({_id:decode._id,'tokens.token':token})
         if(!user){
            throw new Error()
         }
         req.token=token
         req.user = user
        //  console.log(req.user)
         next()
    } catch (error) {
        res.status(401).send({error:'Authentication failed'})
    }
}

module.exports = auth