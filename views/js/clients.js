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
    const addressInput = document.forms['form'].address.trim()
    
    if (!nameInput) {
        alert("Preencha o campo nome corretamente!")
        return false
    }

    if (!emailInput || !emailInput.includes("@") || !emailInput.includes(".")) {
        alert("Preencha o campo email corretamente!")
        return false
    }

    if (!telInput || telInput.length < 9) {
        alert("Preencha o campo telefone corretamente!")
        return false
    }

    if (!addressInput) {
        alert("Preencha o campo endereço corretamente.")
        return false
    }

    console.log("Todos os campos foram preenchidos corretamente.")
    return true
} 
form.addEventListener('submit', e =>{
    e.preventDefault()
    validateForm()
})