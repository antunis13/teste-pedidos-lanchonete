const clientBtn = document.querySelector('#client')


function obterLista(){
    const clientsList = document.querySelector('#clients-list')

    fetch('http://localhost:8080/api/clients/').then(response =>{
        response.json().then(data =>{
            const clientsHtml = data.map(clients => `
                <li>
                   Nome: ${clients.name} <br>
                   Email: ${clients.email} <br>
                   Telefone: ${clients.tel} <br>
                   Endereço: ${clients.address} <br>

                    <a href="#" class="remove-btn" data-id"${clients.id}">Excluir</a>
                    <hr>
                </li>
            `).join('')
            clientsList.innerHTML = clientsHtml
        })
    })
}

clientBtn.onclick = function(){

    obterLista()
}
