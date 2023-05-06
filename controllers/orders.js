const OrdersModel = require('../models/orders')

async function get(req, res){
    const {id} = req.params 

    const obj = id? {_id : id} : null

    const orders = await OrdersModel.findOne(obj)

    res.send(orders)
}
async function post(req, res){
    const {
        date,
    } = req.body

    const register = new OrdersModel({
        date,
    })

    register.save()

    if(!register.ok){
        message = 'error'
    }
    res.send({
        message: 'success'
    })
}

async function remove(req, res){
    const {id} = req.params

    const remove = await OrdersModel.deleteOne({_id: id})

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