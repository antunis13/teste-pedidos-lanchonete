const API_URL = 'http://localhost:8080/api/orders'

const form = document.querySelector('#form')

function obterListaProdutos() {
    const productsList = document.querySelector('#products-list')

    fetch('http://localhost:8080/api/products/').then(response => {
        response.json().then(data => {
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

function obterListaClientes() {
    const clientsList = document.querySelector('#clients-list')

    fetch('http://localhost:8080/api/clients/').then(response => {
        response.json().then(data => {
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

const formSubmit =  (event) => {
    event.preventDefault()

    const date = form.date.value
    const idProduct = form.idProduct.value
    const nameProduct = form.nameProduct.value
    const nameClient = form.nameClient.value
    
    if (!date.trim()) {
        alert("Preencha o campo data corretamente!")
        return
    }
    
    if (!idProduct.trim()) {
        alert("Preencha o campo id do produto corretamente!")
        return
    }
    
    if (!nameProduct.trim()) {
        alert("Preencha o campo nome do produto corretamente!")
        return
    }
    
    if (!nameClient.trim()) {
        alert("Preencha o campo nome do cliente corretamente.")
        return
    }
    
    console.log("Todos os campos foram preenchidos corretamente.")

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
    }).then(response => response.json()).then(data => {
        if (data.message === 'success') {
            alert('Cadastrado')
            form.reset()
        }
    }).catch(error => {
        alert('Ocorreu um erro ao processar a solicitação.')
        console.error(error)
    })
}

function init(){
    obterListaProdutos()
    obterListaClientes()
    form.addEventListener('submit', formSubmit)
}

init()