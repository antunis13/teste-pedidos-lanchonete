
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#clients-list')) {
        obterListaClientes()
    } 
})

function eventoRemoverClientes(){
    const removeBtn = document.querySelectorAll('#remove-btn')

    removeBtn.forEach(button => {
        button.onclick = function(e){
            e.preventDefault()
            const id = this.dataset.id
            console.log(id)

            fetch(`http://localhost:8080/api/clients/${id}`, {
            method: 'DELETE',
            }).then(response => {
                response.json().then(data =>{
                    if(data.message = 'success'){
                        alert('Cliente excluído com sucesso')
                        obterListaClientes()
                    }else{
                        alert('Ocorreu um erro')
                    }
                })
            })
        }
    })
}

function obterListaClientes(){
    const clientsList = document.querySelector('#clients-list')

    fetch('http://localhost:8080/api/clients/').then(response =>{
        response.json().then(data =>{
            const clientsHtml = data.map(clients => `
                <ul>
                    <li>
                        <p>Nome:</p> ${clients.name} 
                    </li>
                    <li>
                        <p>Email:</p> ${clients.email} 
                    </li>
                    <li>
                        <p>Telefone:</p> ${clients.tel} 
                    </li>
                    <li>
                        <p>Endereço:</p> ${clients.address}
                    </li>
            
                    <a href="#" id="remove-btn" class="remove" data-id="${clients._id}">Excluir</a>
                </ul>
            `).join('')
            clientsList.innerHTML = clientsHtml
            
            eventoRemoverClientes()
        })
    })
}