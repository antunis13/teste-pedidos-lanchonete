const API_URL = 'http://localhost:8080/api/clients/'

const form = document.querySelector('#form')

form.onsubmit = function(e) {
    e.preventDefault()

    const name = document.forms['form'].name.value
    const email = document.forms['form'].email.value
    const tel = document.forms['form'].tel.value
    const address = document.forms['form'].address.value

    const data = {
    name,
    email,
    tel,
    address,
};
    console.log('Dados enviados:', JSON.stringify(data));

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            tel,
            address,
        })
    }).then(response =>{
        response.json().then(data =>{
            if(data.message === 'success'){
                alert('Cadastrado')
                form.reset()
            }
        })
    }).catch(error => {
        alert('Ocorreu um erro ao processar a solicitação.');
        console.error(error) 
    })
}