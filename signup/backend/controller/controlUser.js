
const user = require('../models/users')
const bcrypt = require('bcrypt')

const signupUser=async(req,res,next)=>{
    try{
        const {name,email,phone,password} = req.body;
        const existing = await user.findOne({where : {email}})
        if(existing){
            return res.status(409).json({message:'user already registered'})
        }
        const hashpassword = await bcrypt.hash(password,10)
        const result = await user.create({name,email,phone,password:hashpassword})
        res.json(result.dataValues)
    }
    catch(err){
        err.statusCode = 500
        next(err)
    }
}

const getUser = async(req,res,next)=>{
    try{
        const {id} = req.params
        const result = await user.findByPk(id)
        if(!result){
            return res.status(404).json({message:'User Not Found'})
        }
        else{
            res.json(result)
        }
    }
    catch(err){
        err.statusCode = 500
        next(err)
    }
}

module.exports = {
    signupUser,
    getUser
}
