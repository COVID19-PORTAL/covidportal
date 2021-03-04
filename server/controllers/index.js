const {User} = require('../models')
const { comparePassword } = require('../helpers/passwordHelper')
const { generate } = require('../helpers/verifyToken')

class Controller {  
    static register(req, res) {
        let newUser = {
            email : req.body.email,
            password : req.body.password
        }
        User.create(newUser)
            .then(data => {
                res.status(201).json({
                    msg : 'register success', 
                    id : data.id,
                    email : data.email,
                })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static login(req, res) {
        let loggedUser = { 
            email : req.body.email,
            password : req.body.password
        }
        User.findOne({where : {email : loggedUser.email}})
            .then(data => {
                if(data){
                    const compared = comparePassword(loggedUser.password,data.password)
                    if(compared){
                        const token = generate({
                            id : data.id,
                            email : data.email
                        }, process.env.SECRET_KEY)
                        res.status(200).json({token})
                    }else{
                        res.status(400).json({msg : 'invalid user or password'})
                    }
                }else{
                    res.status(400).json({msg : 'invalid user or password'})
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findAll(req, res) {
        
    }

}

module.exports = Controller