const expense = require('../models/expense')

const addExpense = async(req,res,next)=>{
    try{
        const {price,description,category} = req.body

        const result = await expense.create({
            price,
            description,
            category,
            userId : req.user.id
        })
        res.status(201).json(result)
    }
    catch(err){
        err.statusCode=500
        next(err)
    }
}

const getExpense = async(req,res,next)=>{
    try{
        const expenses = await expense.findAll({
            where:{userId:req.user.id}
        })
        res.json(expenses)
    }
    catch(err){
        err.statusCode = 500
        next(err)
    }
}

const deleteExpense = async(req,res,next)=>{
    try{
        const Id = req.params.id

        const deleted = await expense.findOne({
            where:{
                id : Id,
                userId : req.user.id
            }
        })
        if(!deleted){
            return res.status(404).json({message:'Not found'})
        }
        await deleted.destroy()
        res.json({message:'Expense deleted'})
    }
    catch(err){
        err.statusCode = 500
        next(err)
    }
}

module.exports = {
    addExpense,
    getExpense,
    deleteExpense
}