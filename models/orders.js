const mongoose = require('mongoose')

const schema = new mongoose.Schema({
date: String,
idProduct: String,
nameProduct: String,
idClient: String,
status: {
    type: String,
    enum: ['pendente', 'em_preparo', 'em_entrega', 'entregue', 'cancelado'],
    default: 'pendente'
  }
})

const Model = mongoose.model('orders', schema)

module.exports = Model