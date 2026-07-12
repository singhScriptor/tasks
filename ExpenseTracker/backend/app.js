const express = require('express')
const path = require('path')
const port = 3000
const cors = require('cors')
const db = require('../backend/utils/db-connection')

const app = express()

app.use(cors())
app.use(express.json())

const signUpuser = require('./routes/signUpuserRoutes')

const signInuser = require('./routes/signInuserRoutes')

const expense = require('./routes/expenseRoutes')

app.use(express.static(path.join(__dirname,'../frontend')))

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname, '../frontend/signup.html'));

})

app.get('/signin',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/signIn.html'))
})

app.get('/expense',(req,res)=>{
    res.sendFile(path.join(__dirname,'../frontend/expense.html'))
})

app.get('/', (req, res) => {
    res.redirect('/signin');   // ✅ always show signin first
});


app.use('/user',signUpuser)
app.use('/',signInuser)
app.use('/expense',expense)

db.sync({alter:true})
.then(()=>{
    app.listen(3000,()=>{
        console.log('server is listening...!')
    })
})
.catch((err)=>{
    console.log(err.message)
})

