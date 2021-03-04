const router = require('express').Router()
const Controller = require('../controllers')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/covid', Controller.findAll)
router.get('/hospital/:province', Controller.getHospital);
router.get('/news', Controller.viewHealthNews);


module.exports = router