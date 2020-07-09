const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const key = process.env.apiKey

// render search page
router.get('/search', (req, res) => {
    res.render('search')
})

// index trail results based on user location
router.post('/search-results', (req, res) => {
    let lat = req.body.latitude
    let long = req.body.longitude
    let hikeSearch = `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=10&key=${key}`
    axios.get(hikeSearch)
        .then((trails) => {
            console.log(trails)
            res.render('search-results', { trails: trails.data.trails })
        }).catch((err) => {
            console.log(err)
        })
})

// show additional trail info based on unique trail id
router.get('/:id', (req, res) => {
    let id = req.params.id
    let hikeSearchById = `https://www.hikingproject.com/data/get-trails-by-id?ids=${id}&key=${key}`
    axios.get(hikeSearchById)
        .then((trails) => {
            console.log(trails.data.trails[0].name)
            res.render('show', { trail: trails.data.trails[0] })
        })
})

module.exports = router