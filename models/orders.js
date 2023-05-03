const mongoose = require('mongoose')

const schema = new mongoose.Schema({
date: String,
})

const Model = mongoose.model('orders', schema)

module.exports = Model