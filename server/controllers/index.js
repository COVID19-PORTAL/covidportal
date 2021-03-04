const jwt = require('jsonwebtoken')
const {User, Population} = require('../models')
const {comparePassword} = require('../helpers/passwordHelper')
const axios = require('axios');
const count = require('../helpers/count-percentage-of-covid');
const filter = require('../helpers/filter-province');
const random = require('../helpers/pick-random-news')

class Controller {

    static register(req, res) {
       
    }

    static login(req, res) {
        
    }

    static findAll(req, res) {
        const array = [axios({method: 'GET',url: "https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more"}), Population.findAll()]; 
        Promise.all(array)
            .then(results => {
                const covids = results[0].data;
                const populations = results[1];
                const percentages = count(covids, populations);
                res.status(200).json({percentages});
            })
            .catch(err =>{
                res.status(500).json(err);
            }) 
    }

    static getHospital(req, res){
        const array = [axios({method: 'GET',url: "https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more"}), axios({method: 'GET',url: "https://dekontaminasi.com/api/id/covid19/hospitals"})]
        Promise.all(array)
            .then(results => {
                const covids = results[0].data;
                const hospitals = results[1].data;
                const filterData = filter(req.params.province, covids, hospitals);
                res.status(200).json(filterData);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static viewHealthNews(req, res){
        axios({
            method: 'GET',
            url: "http://newsapi.org/v2/top-headlines?q=COVID-19&country=id&category=health&apiKey=d367e5c5c5d744869d21c4e37d195f2c"
        })
            .then(news => {
                const randomNews = random(news.data);
                res.status(200).json(randomNews);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

}

module.exports = Controller