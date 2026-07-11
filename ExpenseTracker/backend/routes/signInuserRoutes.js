const express = require('express')
const router = express.Router()

const controlRouter = require('../controller/signIncontrolUser')

router.post('/signin',controlRouter.signIn)

module.exports = router