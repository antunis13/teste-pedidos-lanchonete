
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('#products-list')) {
        obterListaProdutos()
    } 
    
})

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
