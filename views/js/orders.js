const API_URL = 'http://localhost:8080/api/orders'

const form = document.querySelector('#form')

form.onsubmit = function(e) {
    e.preventDefault()

    const date = document.forms['form'].date.value
    const idProduct = document.forms['form'].idProduct.value
    const nameProduct = document.forms['form'].nameProduct.value
    const nameClient = document.forms['form'].nameClient.value
   


    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date,
            idProduct,
            nameProduct,
            nameClient,
        })
    }).then(response =>
        response.json().then(data =>{
            if(data.message === 'success'){
                alert('Cadastrado')
                form.reset()
            }
        })
    ).catch(error => {
        alert('Ocorreu um erro ao processar a solicitação.');
        console.error(error) 
    })
}
function obterListaProdutos(){
    const productsList = document.querySelector('#products-list')

    fetch('http://localhost:8080/api/products/').then(response =>{
        response.json().then(data =>{
            const productsHtml = data.map(products => `
                <li>
                   ID: ${products._id} <br>
                   Nome: ${products.name} <br>
                   Price: ${products.price} <br>
                   <hr>
                </li>
            `).join('')
            productsList.innerHTML = productsHtml
        })
    })
}
function obterListaClientes(){
    const clientsList = document.querySelector('#clients-list')

    fetch('http://localhost:8080/api/clients/').then(response =>{
        response.json().then(data =>{
            const clientsHtml = data.map(clients => `
            <li>
            ID: ${clients._id} <br>
            Nome: ${clients.name} <br>
            <hr>
            </li>
            `).join('')
            clientsList.innerHTML = clientsHtml

        })
    })
}

obterListaClientes()
obterListaProdutos()