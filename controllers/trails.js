const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const key = process.env.apiKey

router.get('/search', (req, res) => {
    res.render('search')
})

router.get('/search-results', (req,res) => {
    let lat = req.query.latitude
    let long = req.query.longitude
    let hikeSearch = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=10&key=${key}`
    axios.get(hikeSearch)
        .then((data) => {
            // res.send(data.data.trails)
            res.render('search', {trails: data.data.trails})
        }).catch((err) => {
            console.log(err)
        })
})

router.get('/:idx', (req, res) => {
    res.render('show')
})

module.exports = router