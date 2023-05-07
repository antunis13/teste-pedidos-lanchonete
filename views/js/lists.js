const clientsBtn = document.querySelector('#clients')
const productsBtn = document.querySelector('#products')
const ordersBtn = document.querySelector('#orders')


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

                    <a href="#" class="remove-btn" data-id"${clients.id}">Excluir</a>
                    <hr>
                </li>
            `).join('')
            clientsList.innerHTML = clientsHtml
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
                
                    <a href="#" class="remove-btn" data-id"${products.id}">Excluir</a>
                    <hr>
                </li>
            `).join('')
            productsList.innerHTML = productsHtml
        })
    })
}


clientsBtn.onclick = function(){

    obterListaClientes()
}

productsBtn.onclick = function(){

    obterListaProdutos()
}
