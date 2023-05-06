const API_URL = 'http://localhost:8080/api/products'

const form = document.querySelector('#form')

form.onsubmit = function(e) {
    e.preventDefault()

    const name = document.forms['form'].name.value
    const price = document.forms['form'].price.value

    const data = {
    name,
    price
    };
    console.log('Dados enviados:', JSON.stringify(data));

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
