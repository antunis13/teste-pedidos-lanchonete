const ClientsModel = require('../models/clients')

async function get(req, res){
    const {id} = req.params 

    const obj = id? {_id : id} : null

    const clients = await ClientsModel.find(obj)

    res.send(clients)
}
async function post(req, res){
    const {
        name,
        email,
        tel,
        address,
    } = req.body

    const register = new ClientsModel({
        name,
        email,
        tel,
        address,
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

    const remove = await ClientsModel.deleteOne({_id: id})

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