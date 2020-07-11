const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')
const key = process.env.apiKey
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, function(req, res) {
    console.log('sefjighselrghj')
    db.user.findOne({
        include: [
            db.trail,
        ],
        where: {
            id: req.user.id
        }
    })
        .then(user => {
            console.log(user)
            res.render('profile', {user})
            })
            .catch(err => {
                console.log(err)
            })
        })

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
            res.send()
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
})

// update user's rank of trail (1-5)
router.put('/:id', (req, res) => {
    console.log("RED", req.params.id)
    db.trailsUsers.update({
        rank: req.body.rank
    },
        {
            where: {
                trailId: req.body.trailId,
                userId: req.user.id
            }
    }).then(trail => {
        console.log(trail, 'BALLOON')
        res.redirect('/profile')
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