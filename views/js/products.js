const API_URL = 'http://localhost:8080/api/products'

const form = document.querySelector('#form')

const formSubmit = (event) => {
    event.preventDefault()

    const name = form.name.value
    const price = form.price.value

    if(!name.trim()){
        alert('Preencha o campo nome do produto corretamente')
        return
    }
    if(!price.trim()){
        alert('Preencha o campo preço corretamente')
        return
    }

    console.log('Todos os campos foram preenchidos corretamente')

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            price
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

function init (){
    form.addEventListener('submit', formSubmit)
}

init()