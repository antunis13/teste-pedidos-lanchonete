const form = document.querySelector('#loginAdmin')
const button = document.querySelector('#button')

form.addEventListener('submit', e =>{
    e.preventDefault()
    const name = document.querySelector('#name')
    const password = document.querySelector('#password')

    if(name.value === '' || name.value === null){
        alert('Preencha o campo')
    }
    if(password.value === '' || password.value !== '123'){
        alert('Senha incorreta')
    }
    else{
        window.location.href = 'http://127.0.0.1:5500/views/main.html'
    }

})   
