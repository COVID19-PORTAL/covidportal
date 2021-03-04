const router = require('express').Router()
const Controller = require('../controllers')

router.get('/', (req, res) => {
    res.send('Hello World');
})

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/googleLogin', Controller.loginGoogle)
router.get('/covid', Controller.findAll)


module.exports = router