const router = require('express').Router()
const Controller = require('../controllers')
const authentication = require('../middlewares/auth')

// router.use()
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/covid', authentication, Controller.findAll)


module.exports = router