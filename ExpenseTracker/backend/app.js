const express = require('express')
const path = require('path')
const cors = require('cors')

// database connection
const db = require('./utils/db-connection') // Adjusted path if app.js is in backend root

// Importing relationships file so Sequelize executes the associations
require('./models/index')

const app = express()
const port = 3000

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../frontend')))

// Routes
const signUpuser = require('./routes/signupRoutes')
const signInuser = require('./routes/signinRoutes')
const expenseTrack = require('./routes/expenseRoutes')
const paymentRoutes = require('./routes/paymentRoutes')

// HTML Page Serving
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/signup.html'));
})

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/signIn.html'))
})

app.get('/expense', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/expense.html'))
})

app.get('/', (req, res) => {
    res.redirect('/signin'); // Always signin first
});

// redirect to details page after payment
app.get('/payment-status', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/status.html'));
});

// API Routes
app.use('/user', signUpuser)
app.use('/', signInuser)
app.use('/api/expense', expenseTrack)
app.use('/api/payment',paymentRoutes)

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error'
    });
});

// Database sync and Start server
db.sync({alter:true})
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running and listening on port ${port}...!`)
        })
    })
    .catch((err) => {
        console.error('Database connection/sync failed:', err.message)
    })