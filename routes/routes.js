const router = require('express').Router()
const {Router} = require('express')
const ProductController = require('../controllers/products')

//admin
router.get('/admin', (req, res) => {
    res.send({
        ok: 'funciounou'
    })
})


//clients
router.get('/clients', (req, res) => {

    res.send({
        ok: 'funcionou'
    })
})

module.exports = router