const mongoose = require('mongoose')

const schema = new mongoose.Schema({
date: String,
idProduct: String,
nameProduct: String,
idClient: String,
})

const Model = mongoose.model('orders', schema)

module.exports = Model