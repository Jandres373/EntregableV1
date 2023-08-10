//Tomamos los elementos del DOM con los que trabajaremos en el carrito (vale la pena resaltar que los elementos ya declarados en otros archivos igual están disponibles en este)
let getCart = document.getElementById('get_cart')
let cartActivator = document.querySelector('.fa-opencart')
// creamos una variable para controlar si el carrito debe abrirse o no y sí debe ser togueable o no 
let isCartOpen = false
// creamos una variable para almacenar el HTML sacado del archivo cart.html que obtendremos al hacerle fetch para evitar escribir codigo HTML directamente en el js.
let cartHTML = null
// La funcion openCart se encarga de realizar 1) modificacion al borde inferiro derecho del nav-bar cuando el carrito se expande 2) abre el carrito, recibe como parametro ''reOpenCar'' que basicamente lo que hace es definir si activar o desactivar la posibilidad de que sea togueable el botón al hacer clic
function openCart(reOpenCar=true) {
    if (isCartOpen) {
        getNavBar.classList.add('adjust_border_radius')  
        getCart.classList.add('show_cart')
    } else {
        getNavBar.classList.remove('adjust_border_radius')
        getCart.classList.remove('show_cart')
    }
    reOpenCar && (isCartOpen = !isCartOpen)
    !reOpenCar && (isCartOpen = true)
}
  //All haber declarado null la variable cartHTML esta condicion se cumple siempre que se inicie el programa o cartHTML no exista, de manara que se evita hacer fetch de manera repetida al archivo cart.html
if (!cartHTML) {
    fetch('/components/cart.html')
    .then(result => data = result.text())
    .then(HTML => {
        cartHTML = HTML
        getCart.insertAdjacentHTML('beforeend', HTML)
        //estas variables deben ser declaradas aquí ya que solo estarán disponibles una vez se haya cargado el html del carrito.
        let cartInsertion = document.getElementById('cart_insert_product')
        let productAdded = JSON.parse(sessionStorage.getItem('selectedProduct'))
        console.log(productAdded)

        // Se agrega la funcion openCart() al icono del carrito, de manera que al clickear el icono salga el carrito.
        cartActivator.addEventListener('click', () => {
            openCart()
        })
    })
} else {
    // este else controla el hecho de que si yá se desplegó el HTML no sea necesario hacerle fetch de nuevo.
    getCart.insertAdjacentHTML('beforeend', cartHTML)
    // la funcion tiene que ser asignada de nuevo dos veces porque fue asignada dentro del resultado positivo del if, si no se ejecuta entonces no se asignará al evento click a menos que se reasigne aquí.
    cartActivator.addEventListener('click', () => {
        openCart()
    })
}