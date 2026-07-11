const express = require('express')

const router = express.Router()

const controlUser = require('../controller/signUpcontrolUser')

router.post('/',controlUser.signupUser)
router.get('/:id',controlUser.getUser)

module.exports = router