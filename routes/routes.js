const router = require('express').Router()
const {Router} = require('express')
const ClientsController = require('../controllers/clients')




//clients
router.get('/clients/:id?', ClientsController.get)

module.exports = router