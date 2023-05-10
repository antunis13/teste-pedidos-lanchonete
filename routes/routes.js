const router = require('express').Router()
const {Router} = require('express')
const ClientsController = require('../controllers/clients')
const ProductsController = require('../controllers/products')
const OrdersController = require('../controllers/orders')



//clients
router.get('/clients/:id?', ClientsController.get)
router.post('/clients/', ClientsController.post)
router.delete('/clients/:id', ClientsController.remove)


//products
router.get('/products/:id?', ProductsController.get)
router.post('/products/', ProductsController.post)
router.delete('/products/:id', ProductsController.remove)

//orders
router.get('/orders/:id?', OrdersController.get)
router.post('/orders/', OrdersController.post)
router.delete('/orders/:id', OrdersController.remove)

//status
router.put('/orders/:id/status', OrdersController.put)

module.exports = router