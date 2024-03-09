const clientsBtn = document.querySelector('#clients')
const productsBtn = document.querySelector('#products')
const ordersBtn = document.querySelector('#orders')

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#clients-list')) {
        obterListaClientes()
    } else if (document.querySelector('#products-list')) {
        obterListaProdutos()
    } else if (document.querySelector('#orders-list')) {
        obterListaPedidos()
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

function eventoRemoverProdutos(){
    const removeBtn = document.querySelectorAll('#remove-btn')

    removeBtn.forEach(button => {
        button.onclick = function(e){
            e.preventDefault()
            const id = this.dataset.id

            fetch(`http://localhost:8080/api/products/${id}`, {
            method: 'DELETE',
            }).then(response => {
                response.json().then(data =>{
                    if(data.message = 'success'){
                        alert('Produto excluído com sucesso')
                        obterListaProdutos()
                    }else{
                        alert('Ocorreu um erro')
                    }
                })
            })
        }
    })
}

function eventoRemoverPedidos(){
    const removeBtn = document.querySelectorAll('#remove-btn')

    removeBtn.forEach(button => {
        button.onclick = function(e){
            e.preventDefault()
            const id = this.dataset.id

            fetch(`http://localhost:8080/api/orders/${id}`, {
            method: 'DELETE',
            }).then(response => {
                response.json().then(data =>{
                    if(data.message = 'success'){
                        alert('Pedido excluído com sucesso')
                        obterListaPedidos()
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

function obterListaProdutos(){
    const productsList = document.querySelector('#products-list')

    fetch('http://localhost:8080/api/products/').then(response =>{
        response.json().then(data =>{
            const productsHtml = data.map(products => `
                <ul>
                
                   <li>
                       <p>Nome:</p> <span>${products.name} </span>
                   </li>
                   <li>
                       <p>Price:</p> ${products.price} 
                   <li>
                
                    <a href="#" id="remove-btn" data-id="${products._id}">Excluir</a>
                </ul>
            `).join('')
            productsList.innerHTML = productsHtml
            
            eventoRemoverProdutos()
        })
    })
}

function obterListaPedidos() {
    const ordersList = document.querySelector('#orders-list')
    const statusEnum = [
      { value: 'pendente', label: 'Pendente' },
      { value: 'em_preparo', label: 'Em Preparo' },
      { value: 'em_entrega', label: 'Em Entrega' },
      { value: 'entregue', label: 'Entregue' },
      { value: 'cancelado', label: 'Cancelado' }
    ];
  
    function getStatusOptions(selectedStatus) {
      let options = ''
  
      statusEnum.forEach(status => {
        const selected = (status.value === selectedStatus) ? 'selected' : ''
        options += `<option value="${status.value}" ${selected}>${status.label}</option>`
      })
  
      return options
    }
  
    fetch('http://localhost:8080/api/orders/').then(response => {
      response.json().then(data => {
        const ordersHtml = data.map(orders =>  `
            <ul>
              <li>
                    <p>Data de criação:</p> ${orders.date}
              </li>
              <li>
                    <p>Id do Produto:</p> ${orders.idProduct} 
              </li>
              <li>
                    <p>Nome do Produto:</p> ${orders.nameProduct} 
              </li>
              <li>
                    <p>Id do Cliente:</p> ${orders.idClient}
              </li>
              <a href="#" id="remove-btn" data-id="${orders._id}">Excluir</a> <br><br>
              <p>Status: </p>
              <select id="statusSelect_${orders._id}" class="status-select" data-id="${orders._id}">
                ${getStatusOptions(orders.status)}
              </select>
            </ul>
        `).join('')
  
        ordersList.innerHTML = ordersHtml
        eventoRemoverPedidos()
        eventoAtualizarStatusPedidos()
      })
    })
}

function eventoAtualizarStatusPedidos() {
    const statusSelects = document.querySelectorAll('.status-select');
  
    statusSelects.forEach(select => {
      select.addEventListener('change', () => {
        const orderId = select.dataset.id;
        const newStatus = select.value;
  
        atualizarStatusPedido(orderId, newStatus);
      });
    });
}
   
function atualizarStatusPedido(orderId, newStatus) {
    fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
    .then(response => {
      
      console.log(`Status do pedido ${orderId} atualizado para ${newStatus}`)
    })
    .catch(error => {
      
      console.error('Erro ao atualizar o status do pedido:', error)
    })
}
  