const express = require('express')
const router = express.Router()

const UserController = require('../controller/UserController')

router.post('/Login', UserController.login)

router.post('/Signup', UserController.signup)







router.get('/', ((req, res) => {
    res.json({
        msg: 'Hello World'
    })
}));

module.exports = router