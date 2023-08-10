let getCart = document.getElementById('get_cart')
let cartActivator = document.querySelector('.fa-opencart')

let isCartOpen = false
function openCart() {
    if (isCartOpen) {
        getNavBar.classList.add('adjust_border_radius')  
        getCart.classList.add('show_cart')
    } else {
        getNavBar.classList.remove('adjust_border_radius')
        getCart.classList.remove('show_cart')
    }
    isCartOpen = !isCartOpen
}

fetch('/components/cart.html')
.then(result => data = result.text())
.then(HTML => {
    getCart.innerHTML = HTML 
    let cartInsertion = document.getElementById('cart_insert_product')
    let productAdded = JSON.parse(localStorage.getItem('selectedProduct'))
    console.log(productAdded)

    
    cartActivator.addEventListener('click', () => {
        openCart()
       
        
        
})


    
     

})