const API_URL = 'http://localhost:8080/api/clients/'

const form = document.querySelector('#form')

form.onsubmit = function(e) {
    e.preventDefault()

    const name = document.forms['form'].name.value
    const email = document.forms['form'].email.value
    const tel = document.forms['form'].tel.value
    const address = document.forms['form'].address.value



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

const validateForm = function(){
    const nameInput = document.forms['form'].name.value.trim()
    const emailInput = document.forms['form'].email.value.trim()
    const telInput = document.forms['form'].tel.value.trim()
    
    if(nameInput === '' || nameInput === null){
        alert("Preencha este campo corretamente!")
    }else{

        if(emailInput.indexOf("@")== -1 || emailInput.indexOf(".")== -1 || emailInput === '' || emailInput === null){
            alert("Preencha este campo corretamente!")
        }else{

            if(telInput ===''|| telInput === null|| telInput.length < 9){
                alert("Preencha este campo corretamente!")
            }
        }
    }
} 
form.addEventListener('submit', e =>{
    e.preventDefault()
    validateForm()
})