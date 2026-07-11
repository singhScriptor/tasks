const express = require('express')
const path = require('path')
const port = 3000
const cors = require('cors')
const db = require('../backend/utils/db-connection')

const app = express()

app.use(cors())
app.use(express.json())

const signUpuser = require('./routes/signUpuserRoutes')

app.use(express.static(path.join(__dirname,'../frontend')))

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname, '../frontend/signup.html'));
})

app.use('/user',signUpuser)

db.sync({alter:true})
.then(()=>{
    app.listen(3000,()=>{
        console.log('server is listening...!')
    })
})
.catch((err)=>{
    console.log(err.message)
})

