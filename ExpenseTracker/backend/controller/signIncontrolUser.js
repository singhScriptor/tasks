const user = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signIn = async(req,res,next)=>{
    try{
        const {email,password} = req.body
        const result = await user.findOne({where : {email}})
        if(!result){
            return res.status(404).json({message:"user not found"})
        }
        //comparing user password from bcrypt password
        const passkey = await bcrypt.compare(password,result.password)
        if(!passkey){
            return res.status(401).json({message:'Invalid credentials'})
        }
        const token = jwt.sign({ id: result.id, email: result.email }, 'secretkey');

        return res.status(200).json({message : "successful login", token, userId:result.id})
    }
    catch(err){
        err.statusCode = 500
        next(err)
    }
}

module.exports = {signIn}