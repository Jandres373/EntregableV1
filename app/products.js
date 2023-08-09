let getProducts = document.getElementById('get_products')
let academloAPI = 'https://ecommercebackend.fundamentos-29.repl.co/'


    
    
fetch('./components/products.html')
.then(response => response.text())
.then(htmlDoc => {
    let HTML = htmlDoc // Esta variable HTML contiene el codigo html del componente products.html
    /* <-- Aquí se insertan los productos --> */



    // Este codigo puede ser omitido
/*     fetch(academloAPI)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const products = Array(data.length).fill(HTML)
        getProducts.innerHTML = data.map((product,i) => { 
            return HTML.replace('{dsp_product_id}', data[i].id) 
            .replace('{dsp_product_image}', data[i].image) 
            .replace('{dsp_product_name}',  data[i].name) 
            .replace('{dsp_product_price}', data[i].price); 
        }).join('');
    })
    .catch(error => { 
        getProducts.innerHTML = `<h1>El Team 4 lo lamenta. La API nos devuelve un error de tipo:</h1>
                        <p style="color: red; font-size: 25px;">${error}</p>
                        <p>Por favor, refresca la página o vuelve en unos minutos.</p>`;
    })  */
});

