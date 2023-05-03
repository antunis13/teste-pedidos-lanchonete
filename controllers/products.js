const ProductsModel = require('../models/products')

async function get(req, res){
    const {id} = req.params 

    const obj = id? {_id : id} : null

    const products = await ProductsModel.findOne(obj)

    res.send(products)
}
async function post(req, res){
    const {
        name,
        email,
        tel,
        address,
    } = req.body

    const register = new ProductsModel({
        name,
        email,
        tel,
        address,
    })

    register.save()

    res.send()
}

async function remove(req, res){
    const {id} = req.params

    const remove = await ProductsModel.deleteOne({_id: id})

    if(!remove.ok){
        message = 'error'
    }
    res.send({
        message: 'success'
    })
}

module.exports = {
    get,
    post,
    remove,
}