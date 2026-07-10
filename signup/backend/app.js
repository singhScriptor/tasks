const express = require('express')
const path = require('path')
const port = 3000
const cors = require('cors')
const db = require('../backend/utils/db-connection')

const app = express()

app.use(cors())
app.use(express.json())

const signUpuser = require('./routes/userRoutes')

app.use('/',express.static(path.join(__dirname,'../frontend')))

app.get('/',(req,res)=>{
    res.send('<h1>Hello world</h1>')
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

