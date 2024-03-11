function connect(){

    const mongoose = require('mongoose')

    mongoose.connect('mongodb://192.168.0.106:27017/teste-pedidos-lanchonete')

    const db = mongoose.connection

    db.once('open', ()=>{
        console.log('Connected to database')
    })
    db.on('error', console.error.bind(console,'connection error:'))
}

module.exports = {
    connect
}