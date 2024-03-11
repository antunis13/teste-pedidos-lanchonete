const OrdersModel = require('../models/orders')

async function get(req, res){
    const {id} = req.params 

    const obj = id? {_id : id} : null

    const orders = await OrdersModel.find(obj)

    res.send(orders)
}
async function post(req, res){
    const {
        date,
        idProduct,
        nameProduct,
        nameClient,
        status,
    } = req.body

    const register = new OrdersModel({
        date,
        idProduct,
        nameProduct,
        nameClient,
        status,
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

async function put(req, res){
    const {id} = req.params
    const orderStatus = await OrdersModel.findById({_id : id})

    orderStatus.status = req.body.status

    await orderStatus.save()

    res.send({
        message: 'success'
    })
}

module.exports = {
    get,
    post,
    remove,
    put,
}