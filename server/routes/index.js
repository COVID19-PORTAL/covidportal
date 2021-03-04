const router = require('express').Router()
const Controller = require('../controllers')
const authentication = require('../middlewares/auth')

// router.use()
router.post('/register', Controller.register)
router.post('/login', Controller.login);
router.post('/googleLogin', Controller.googleLogin)
router.use(authentication);
router.get('/covid/total', Controller.getCovidData);
router.get('/news', Controller.viewHealthNews);
router.get('/covid', Controller.findAll)
router.get('/hospital/:province', Controller.getHospital);


module.exports = router