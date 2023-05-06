const API_URL = 'http://localhost:8080/api/orders'

const form = document.querySelector('#form')

form.onsubmit = function(e) {
    e.preventDefault()

    const date = document.forms['form'].date.value
   


    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date,
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
