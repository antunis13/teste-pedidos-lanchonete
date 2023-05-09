const clientsBtn = document.querySelector('#clients')
const productsBtn = document.querySelector('#products')
const ordersBtn = document.querySelector('#orders')


function eventoRemoverClientes(){
    const removeBtn = document.querySelectorAll('#remove-btn')

    removeBtn.forEach(button => {
        button.onclick = function(e){
            e.preventDefault()
            const id = this.dataset.id
            console.log(id)

            fetch(`http://localhost:8080/api/clients/${id}`, {
            method: 'DELETE',
            }).then(response => {
                response.json().then(data =>{
                    if(data.message = 'success'){
                        alert('Cliente excluído com sucesso')
                        obterListaClientes()
                    }else{
                        alert('Ocorreu um erro')
                    }
                })
            })
        }
    })
}

function eventoRemoverProdutos(){
    const removeBtn = document.querySelectorAll('#remove-btn')

    removeBtn.forEach(button => {
        button.onclick = function(e){
            e.preventDefault()
            const id = this.dataset.id

            fetch(`http://localhost:8080/api/products/${id}`, {
            method: 'DELETE',
            }).then(response => {
                response.json().then(data =>{
                    if(data.message = 'success'){
                        alert('Produto excluído com sucesso')
                        obterListaProdutos()
                    }else{
                        alert('Ocorreu um erro')
                    }
                })
            })
        }
    })
}

function eventoRemoverPedidos(){
    const removeBtn = document.querySelectorAll('#remove-btn')

    removeBtn.forEach(button => {
        button.onclick = function(e){
            e.preventDefault()
            const id = this.dataset.id

            fetch(`http://localhost:8080/api/orders/${id}`, {
            method: 'DELETE',
            }).then(response => {
                response.json().then(data =>{
                    if(data.message = 'success'){
                        alert('Pedido excluído com sucesso')
                        obterListaPedidos()
                    }else{
                        alert('Ocorreu um erro')
                    }
                })
            })
        }
    })
}

function obterListaClientes(){
    const clientsList = document.querySelector('#clients-list')

    fetch('http://localhost:8080/api/clients/').then(response =>{
        response.json().then(data =>{
            const clientsHtml = data.map(clients => `
            <li>
            Nome: ${clients.name} <br>
            Email: ${clients.email} <br>
            Telefone: ${clients.tel} <br>
            Endereço: ${clients.address} <br>
            
            <a href="#" id="remove-btn" data-id="${clients._id}">Excluir</a>
            <hr>
            </li>
            `).join('')
            clientsList.innerHTML = clientsHtml
            
            eventoRemoverClientes()
        })
    })
}

function obterListaProdutos(){
    const productsList = document.querySelector('#products-list')

    fetch('http://localhost:8080/api/products/').then(response =>{
        response.json().then(data =>{
            const productsHtml = data.map(products => `
                <li>
                   Nome: ${products.name} <br>
                   Price: ${products.price} <br>
                
                    <a href="#" id="remove-btn" data-id="${products._id}">Excluir</a>
                    <hr>
                </li>
            `).join('')
            productsList.innerHTML = productsHtml

            eventoRemoverProdutos()
        })
    })
}

function obterListaPedidos(){
    const ordersList = document.querySelector('#orders-list')

    fetch('http://localhost:8080/api/orders/').then(response =>{
        response.json().then(data =>{
            const ordersHtml = data.map(orders => `
                <li>
                   Data de criação: ${orders.date}<br>
                   Id do Produto: ${orders.idProduct} <br>
                   Nome do Produto: ${orders.nameProduct} <br>
                   Id do Cliente: ${orders.idClient}                
                    <a href="#" id="remove-btn" data-id="${orders._id}">Excluir</a>
                    <hr>
                </li>
            `).join('')
            ordersList.innerHTML = ordersHtml

            eventoRemoverPedidos()
        })
    })
}

clientsBtn.onclick = function(){

    obterListaClientes()
}

productsBtn.onclick = function(){

    obterListaProdutos()
}

ordersBtn.onclick = function(){
    obterListaPedidos()
}
