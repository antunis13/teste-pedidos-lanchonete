const API_URL = 'http://localhost:8080/api/clients/'

const form = document.querySelector('#form')

form.addEventListener('submit', function(event) {
    event.preventDefault()

    const name = form.name.value 
    const email = form.email.value
    const tel = form.tel.value
    const address = form.address.value

    
    if (!name.trim()) {
        alert("Preencha o campo nome corretamente!")
        return 
    }

    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
        alert("Preencha o campo email corretamente!")
        return
    }

    if (!tel.trim() || tel.length < 9) {
        alert("Preencha o campo telefone corretamente!")
        return
    }

    if (!address.trim()) {
        alert("Preencha o campo endereço corretamente.")
        return
    }

    console.log("Todos os campos foram preenchidos corretamente.")

    
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            email: email,
            tel: tel,
            address: address,
        })
    }).then(response => response.json())
    .then(data => {
        if (data.message === 'success') {
            alert('Cadastrado com sucesso!')
            form.reset()
        } else {
            alert('Verifique os dados e tente novamente.')
        }
    }).catch(error => {
        alert('Ocorreu um erro ao processar a solicitação.')
        console.error(error);
    })
})
