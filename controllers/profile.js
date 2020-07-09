const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const key = process.env.apiKey
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req, res) {
    res.render('profile')
})

// add a trail to user's saved list
router.post('/:id', (req, res) => {
    db.trail.findOrCreate({
        where: {
            trailCode: req.params.id
        }, defaults: {
            name: req.body.name,
            location: req.body.location,
            length: req.body.length,
            conditions: req.body.conditions,
            conditionsDate: req.body.conditionsDate
        }
    }).then(trail => {
        db.trailsUsers.findOrCreate({
            where: {
                trailId: trail[0].dataValues.id,
                userId: req.user.id
            }, defaults: {
                rank: null
            }
        }).then(trailsUsers => {
            res.redirect('/profile')
        }).catch(err => {
            console.log(err)
        })
    })
    .catch((err) => {
        console.log(err)
    })
})

// update user's rank of trail (1-5)
router.put('/', (req, res) => {
    db.trail.update({
        rank: req.body.rank
    },
        {
            where: {
                id: req.params.id // req.body.id?
            }
}).catch((err) => {
    console.log(err)
})
})

// destroy saved trail using unique id
router.delete('/', (req, res) => {
    db.trail.destroy({
        where: {
            id: req.params.id
        }
    }).then(deleted => {
        console.log(deleted)
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router