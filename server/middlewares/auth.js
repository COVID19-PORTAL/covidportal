const {User} = require('../models')
const { verifyToken } = require('../helpers/verifyToken')

const authentication = (req, res, next) => {
    try {
        let {id, email} = verifyToken(req.headers.access_token)
        User.findOne({
            where: {id, email}
        })
        .then(user => {
            req.currentUser = {id: user.id, email: user.email}
            next()
        })
        .catch(err => {
            throw new Error()
        })
    } catch (error) {
        res.status(401).json({msg: 'Unauthorized'})
    }
}


module.exports = authentication