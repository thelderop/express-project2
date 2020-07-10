const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const key = process.env.apiKey
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req, res) {
    db.user.findOne({
        include: [
            db.trail
        ],
        where: {
            id: req.user.id
        }
    })
        .then(user => {
            res.render('profile', {user})
            })
            .catch(err => {
                console.log(err)
            })
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
            res.send() // how do i get the results to populate on the page?
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
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
    }).catch(err => {
        console.log(err)
    })
})

// destroy saved trail using unique id
router.delete('/:id', (req, res) => {
    db.trailsUsers.destroy({
        where: {
            trailId: req.params.id,
            userId: req.user.id
        }
    }).then(deleted => {
        console.log(deleted)
        res.redirect('/profile')
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router