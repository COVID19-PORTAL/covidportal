const {User, Population} = require('../models')
const {comparePassword} = require('../helpers/passwordHelper')
const axios = require('axios');
const count = require('../helpers/count-percentage-of-covid');
const filter = require('../helpers/filter-province');
const random = require('../helpers/pick-random-news')
const { generate } = require('../helpers/verifyToken')
const {OAuth2Client} = require('google-auth-library')

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

    static googleLogin(req, res) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        async function verify(){
            const ticket = await client.verifyIdToken({
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
                let data = user[0];
                let payload = {id: data.id, email: data.email}
                res.status(200).json({
                    id: payload.id,
                    email: payload.email,
                    access_token: generate(payload)
                })
            })
        }
        verify().catch(console.table)
    }

    static findAll(req, res) {
        const array = [axios({method: 'GET',url: "https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more"}), Population.findAll()]; 
        Promise.all(array)
            .then(results => {
                const covids = results[0].data;
                const populations = results[1];
                count(covids, populations);
                covids.sort((a,b)=>{
                    return b.percent - a.percent;
                })
                res.status(200).json({covids});
            })
            .catch(err =>{
                res.status(500).json(err);
            }) 
    }

    static getHospital(req, res){
        axios({
            method: 'GET',
            url: "https://dekontaminasi.com/api/id/covid19/hospitals"
        })
            .then(hospitals => {
                const filterData = filter(req.params.province, hospitals.data);
                res.status(200).json(filterData);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static viewHealthNews(req, res){
        axios({
            method: 'GET',
            url: `http://newsapi.org/v2/top-headlines?q=COVID-19&country=id&category=health&apiKey=${process.env.NEWS_API}`
        })
            .then(news => {
                const randomNews = random(news.data);
                res.status(200).json(randomNews);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static getCovidData(req, res){
        axios({
            method: 'GET',
            url: "https://data.covid19.go.id/public/api/update.json"
        })
            .then(totals =>{
                const {data} = totals;
                res.status(200).json(data.update.total);
            })
            .catch(err =>{
                res.status(500).json(err);
            })
    }

}

module.exports = Controller