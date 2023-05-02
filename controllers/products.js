const ProductsModel = require('../models/clients')

async function get(req, res){
    const {id} = req.params 

    const obj = id? {_id : id} : null

    const clients = await ProductsModel.findOne(obj)

    res.send(clients)
}

module.exports = {
    get,
}