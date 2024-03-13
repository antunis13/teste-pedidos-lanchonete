
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('#orders-list')) {
        obterListaPedidos()
    }
})

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

function obterListaPedidos() {
    const ordersList = document.querySelector('#orders-list')
    const statusEnum = [
      { value: 'pendente', label: 'Pendente' },
      { value: 'em_preparo', label: 'Em Preparo' },
      { value: 'em_entrega', label: 'Em Entrega' },
      { value: 'entregue', label: 'Entregue' },
      { value: 'cancelado', label: 'Cancelado' }
    ]
  
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
                    <p>Nome do Cliente:</p> ${orders.nameClient}
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
    const statusSelects = document.querySelectorAll('.status-select')
  
    statusSelects.forEach(select => {
      select.addEventListener('change', () => {
        const orderId = select.dataset.id
        const newStatus = select.value
  
        atualizarStatusPedido(orderId, newStatus)
      })
    })
}
   
function atualizarStatusPedido(orderId, newStatus) {
    fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })
    .then( 
      console.log(`Status do pedido ${orderId} atualizado para ${newStatus}`)
    )
    .catch(error => {
      
      console.error('Erro ao atualizar o status do pedido:', error)
    })
}
  