let getProducts = document.getElementById('get_products')
let getMoreProducts = document.getElementById('get_more_products')
let getAddToCart = document.getElementById('get_add_to_cart')
let academloAPI = 'https://ecommercebackend.fundamentos-29.repl.co/'
fetch('./components/products.html')
.then(response => response.text())
.then(htmlDoc => {
    let HTML = htmlDoc // Esta variable HTML contiene el codigo html del componente products.html
    /* <-- Aquí se insertan los productos --> */    
    // Este codigo puede ser omitido    

    fetch(academloAPI)
    .then(response => response.json())
    .then(data => {
        let cartInsertion = document.getElementById('cart_insert_product')
        
        let selectedProduct 
        
        const products = Array(data.length).fill(HTML)
        const arrangedData = products.map((product,i) => { 
            product = data[i];
            product['html']=HTML
            return product
        })
        
        getProducts.innerHTML = arrangedData.map( (e,i) => {
            e.html = HTML.replace('{dsp_product_id}', data[i].id) 
            .replace('{dsp_product_image}', data[i].image) 
            .replace('{dsp_product_name}',  data[i].name) 
            .replace('{dsp_product_price}', data[i].price);
            e.html + 'caca' 
            return e.html
        }).join('')
        
        getProducts.addEventListener('click' , (e) => {
            let clickedItem = e.target.parentElement
            console.log(e.target)
            arrangedData.map((e,i)=>{
                if (Number(e.id)===Number(clickedItem.id)) {
                    selectedProduct = e
                }
            })
            selectedProduct = JSON.stringify(selectedProduct)
            localStorage.setItem('selectedProduct' , selectedProduct)
            
            
                let productAdded = JSON.parse(localStorage.getItem('selectedProduct'))
                cartInsertion.innerHTML += productAdded.html
                if (!isCartOpen) {
                    getProducts.addEventListener('click', ()=>{
                        getCart.classList.add('show_cart')
                        getNavBar.classList.add('adjust_border_radius')
                    })
                } 
            
        })
        getMoreProducts.addEventListener('click' , ()=> {
            getMain.classList.toggle('change_size')
            console.log(getProducts)
        }) 
    })
    .catch(error => { 
        getProducts.innerHTML = `<h1>El Team 4 lo lamenta. La API nos devuelve un error de tipo:</h1>
                        <p style="color: red; font-size: 25px;">${error}</p>
                        <p>Por favor, refresca la página o vuelve en unos minutos.</p>`;
    }) 
});
