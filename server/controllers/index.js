const jwt = require('jsonwebtoken')
const {User} = require('../models')
const {comparePassword} = require('../helpers/passwordHelper')
const authentication = require('../middlewares/auth')
const {OAuth2Client} = require('google-auth-library')

class Controller {

    static register(req, res) {
       
    }

    static login(req, res) {
        
    }

    static googleLogin(req, res) {
        const token = req.body.token
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        async function verify(){
            const ticket = await client.verifyToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const googleUserParams = ticket.getPayload()

            User.findOrCreate({
                where: {
                    email: googleUserParams.email
                },
                defaults: {
                    password: (new Date()).toDateString()
                }
            })
            .then(user => {
                let payload = {id: user.id, email: user.email}
                res.status(200).json({
                    id: payload.id,
                    email: payload.email,
                    access_token: generateToken(payload)
                })
            })
        }
        verify().catch(console.error)
    }

    static findAll(req, res) {
        
    }

}

module.exports = Controller