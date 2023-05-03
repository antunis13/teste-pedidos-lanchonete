const router = require('express').Router()
const {Router} = require('express')
const ClientsController = require('../controllers/clients')
const ProductsController = require('../controllers/products')




//clients
router.get('/clients/:id?', ClientsController.get)
router.post('/clients/', ClientsController.post)
router.delete('/clients/:id', ClientsController.remove)

//products

router.get('/products/:id?', ProductsController.get)

module.exports = router