// Obtenemos los elementos del DOM para su manipulación.
let getProducts = document.getElementById("get_products");
let getSelect = document.getElementById("get_select");
let getStore = document.querySelector("#get_store");
let cartActivator = document.querySelector(".fa-cart-shopping");
let getMore = document.getElementById('get_more_products')

// Guardamos la URL de la API de Academlo en una variable.
let academloAPI = "https://ecommercebackend.fundamentos-29.repl.co/";

// creamos una variable para controlar el estado del carrito
let isCarOpen = false
let productsArray = []
let arrProductsByCategory = []
let arrayObjectsInCar = []

cartActivator.addEventListener('click', () => {
  toggleCart()
})
getMore.addEventListener('click', () => {
  expandProducts()
})

function expandProducts() {
  getProducts.classList.toggle('expand_products')
}
function addProductToCart() {
  let getCart = document.getElementById("get_cart");
  let addToCart = document.getElementById("add_to_cart");
  let selectedProductCart;
  addToCart.addEventListener("click", () => {
    selectedProductCart = localStorage.getItem("selectedProduct");
    selectedProductCart = JSON.parse(selectedProductCart);
    

    fetch("./components/cart.html")
      .then((cart) => cart.text())
      .then((cartHTML) => {
        let getProductNumberDisplay = document.querySelector("#get_product_number_display");
        let productHTML = `<div class="product">
        <img src="{dsp_product_image}" alt="Playera negra - logo blanco">
                            <div class="product-details">
                            <p class="product-name">{dsp_product_name}</p>
                            <p class="product-price">{dsp_product_price}</p>
                              <div class="quantity">
                              <i class="fa-solid fa-angle-down"></i>
                                <p class="product-quantity">0</p>
                                <i class="fa-solid fa-angle-up"></i>
                                <button class="remove-btn"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                                </div>
                                </div>`;
        getCart.innerHTML = cartHTML;
        let cartInsertion = document.getElementById("cart_product_insertion");
        let closeCartBtn = document.getElementById("close_cart_btn");

        productHTML = productHTML
        .replace("{dsp_product_image}", selectedProductCart.image)
        .replace("{dsp_product_name}", selectedProductCart.name)
        .replace("{dsp_product_price}", `$${selectedProductCart.price}.00`)
        .replace("{dsp_product_quantity}", selectedProductCart.quantity);
        

        if (productsArray.includes(productHTML)) {
           popModal('risk','Este producto ya está en tu carrito') 
        } else {
          productsArray.push(productHTML)
        }
        updateProductsCount()
        
      
          
        if (cartInsertion) {
          cartInsertion.innerHTML += productsArray.join('')

          let deleteProduct = document.querySelectorAll('.fa-trash-can')
          deleteProduct.forEach(element => {
            element.addEventListener('click', (e) => {
              let productContainer = e.target.closest(".product"); // Encontrar el contenedor del producto
              let productNameElement = productContainer.querySelector(".product-name"); // Encontrar el elemento del nombre del producto
              
              if (productNameElement) {
                const productName = productNameElement.textContent; // Obtener el nombre del producto
              
                // Buscar el producto en el array productsArray basado en su nombre
                const selectedProductIndex = productsArray.findIndex(item => item.includes(productName));
              
                if (selectedProductIndex !== -1) {
                  productsArray.splice(selectedProductIndex, 1); // Eliminar el producto del array
                  cartInsertion.innerHTML = productsArray.join(''); // Actualizar la vista del carrito
                  updateProductsCount(); // Actualizar el contador de productos
                }
              }
            });
          });
          closeCartBtn.addEventListener("click", () => {
            closeCart()
          });
          arrayObjectsInCar.push(selectedProductCart)
          /* console.log(arrayObjectsInCar) */
          
          /* productsArray
          arrayObjectsInCar */
          let increaseArrow = document.querySelectorAll('.fa-angle-up')
          let reduceArrow = document.querySelectorAll('.fa-angle-down')

          increaseArrow.forEach(element => {
            
          element.addEventListener('click', (e)=> {

            let productContainer = e.target.closest(".product"); // Encontrar el contenedor del producto
            let productNameElement = productContainer.querySelector(".product-name");
            const productName = productNameElement.textContent;
            

            increaseProductQuantity(productName)
          })
        });

        reduceArrow.forEach(element => {
            
          element.addEventListener('click', (e)=> {

            let productContainer = e.target.closest(".product"); // Encontrar el contenedor del producto
            let productNameElement = productContainer.querySelector(".product-name");
            const productName = productNameElement.textContent;
            
            reduceProductQuantity(productName)
            
          })
      });
          /// logica del carrito
          function increaseProductQuantity(productName) {
            /* let increaseArrow = document.querySelector('.fa-angle-up') */
            const productIndex = productsArray.findIndex(item => item.includes(productName));
            if (productIndex !== -1) {
              const productElement = document.createElement('div');
              productElement.innerHTML = productsArray[productIndex];
              const quantityElement = productElement.querySelector('.product-quantity');
              console.log(Number(quantityElement.textContent))
              const newQuantity = parseInt(quantityElement.textContent) + 1;
              quantityElement.textContent = newQuantity;
              productsArray[productIndex] = productElement.innerHTML;
              updateProductsCount();
            }
          }
          
          function reduceProductQuantity(productName) {
            /* let reduceArrow = document.querySelector('.fa-angle-down') */
            const productIndex = productsArray.findIndex(item => item.includes(productName));
            if (productIndex !== -1) {
              const productElement = document.createElement('div');
              productElement.innerHTML = productsArray[productIndex];
              const quantityElement = productElement.querySelector('.product-quantity');
              console.log(Number(quantityElement.textContent))
              const newQuantity = parseInt(quantityElement.textContent) -1;
              quantityElement.textContent = newQuantity;
              productsArray[productIndex] = productElement.innerHTML;
              updateProductsCount();
            }
          }
          
        }});

        openCart();
      });
}
function updateProductsCount() {
  let getProductNumberDisplay = document.querySelector("#get_product_number_display");
  getProductNumberDisplay.textContent = productsArray.length 
}
function popModal(type,warning) {
  let modal = document.querySelector('.modal')
  let cartActivator = document.querySelector(".fa-cart-shopping");
  
  
    modal.classList.add('popModal')
    modal.setAttribute('style','background-color: var(--color-base);')
    
    cartActivator.classList.add("fa-shake");
    setTimeout(() => {
      cartActivator.classList.remove("fa-shake");
    }, 800);
    setTimeout(() => {
      modal.classList.remove('popModal')
    }, 3000);
}
function openCart() {
  let getCart = document.getElementById("get_cart");
  let cartActivator = document.querySelector(".fa-cart-shopping");
  let getProductNumberDisplay = document.querySelector(
    "#get_product_number_display"
  );

  getNavBar.classList.add("adjust_border_radius");
  getCart.classList.add("show_cart");
  //controla el movimiento del carrito al agregar un producto
  cartActivator.classList.add("fa-bounce");
  setTimeout(() => {
    cartActivator.classList.remove("fa-bounce");
  }, 800);
  isCarOpen = true
}
function closeCart() {
  let getCart = document.getElementById("get_cart");
  let cartActivator = document.querySelector(".fa-cart-shopping");

  getNavBar.classList.remove("adjust_border_radius");
  getCart.classList.remove("show_cart");
  
  //controla el movimiento del carrito al agregar un producto
  cartActivator.classList.add("fa-beat-fade");
  setTimeout(() => {
    cartActivator.classList.remove("fa-beat-fade");
  }, 800);
  isCarOpen = false
}
function toggleCart() {
  let cartActivator = document.querySelector(".fa-cart-shopping");
  let getCart = document.getElementById("get_cart");
  getCart.classList.toggle("show_cart");
}
//desplegamos las funciones que necesitaremos
function openStore() {
  getStore.firstElementChild.classList.add("store_visible");
}
// Realizamos una petición a la API de Academlo para obtener los datos de los productos
async function fetchProducts() {
  try {
    const response = await fetch(academloAPI);
    const data = await response.json();

    // Generamos las opciones del menú de selección con las categorías únicas de la API
    let categories = data.map((e) => e.category);
    categories.unshift("todos");
    categories = [...new Set(categories)];
    let menuOptions = categories
      .map(
        (category, index) =>
          `<option id="${index}" class="themeContent" value="${category}">${category}</option>`
      )
      .join("");

    // Actualizamos el HTML del menú de selección
    getSelect.innerHTML = menuOptions;

    // Función para renderizar la lista de productos en el DOM
    function renderProducts(productArray) {
      return productArray
        .map(
          (product) => `
          <div class="products_display theme" id="${product.id}">
            <img class="product_img" title="product" src="${product.image}">
            <p class="product_name">${product.name}</p>
            <div class="product_varintas"></div>
            <p class="price">$${product.price}.00</p>
            <button class="themeContent main_product_select_btn product_view" type="button">Ver detalles</button>
          </div>
        `
        )
        .join("");
    }

    // Renderizamos todos los productos iniciales en el DOM
    getProducts.innerHTML = renderProducts(data);

    // Manejamos el cambio en la selección de categorías
    getSelect.addEventListener("change", (event) => {
      const selectedCategory = event.target.value;
      if (selectedCategory === "todos") {
        getProducts.innerHTML = renderProducts(data);
      } else {
        const filteredProducts = data.filter(
          (product) => product.category === selectedCategory
        );
        arrProductsByCategory = filteredProducts
        getProducts.innerHTML = renderProducts(filteredProducts);
      }
    });

    // Agregamos el evento click para ver detalles de un producto
    getProducts.addEventListener("click", (event) => {
      if (event.target.classList.contains("product_view")) {
        const selectedProductElement = event.target.parentElement;
        const selectedProductId = parseInt(selectedProductElement.id);
        const selectedProduct = data.find(
          (product) => product.id === selectedProductId
        );

        // Aquí puedes realizar acciones con el producto seleccionado, como mostrar detalles en otra parte del DOM o guardar en localStorage.
        // Por ahora, solo imprimiré el producto en la consola como ejemplo.

        localStorage.setItem(
          "selectedProduct",
          JSON.stringify(selectedProduct)
        );

        if (selectedProduct) {
          let modifiedHTML = storeHTML
            .replace("{dsp_product_name}", selectedProduct.name)
            .replace("{dsp_product_price}", `$${selectedProduct.price}.00`)
            .replace("{dsp_product_category}", selectedProduct.category)
            .replace("{dsp_product_image}", selectedProduct.image)
            .replace("{dsp_product_description}",selectedProduct.description)
            .replace("{dsp_product_quantity}", selectedProduct.quantity)
            .replace("{dsp_product_image2}", selectedProduct.image);
          getStore.innerHTML = modifiedHTML;
          openStore();
          
        } else {
        }

        let closeBtn = document.querySelectorAll(".close_btn");
        closeBtn.forEach((element) => {
          element.addEventListener("click", () => {
            closeStore();
          });
        });

        addProductToCart();

        return selectedProduct;
      }
    });

    //store

    function closeStore() {
      getStore.firstElementChild.classList.remove("store_visible");
    }

    let relatedProductsHTML = `<div class="store_product_container" id="related_product_01">
                                    <img src="{dsp_related_image}" alt="" class="store_product_img">
                                    <p class="store_product_text_related">{dsp_related_name}</p>
                                </div>`

    let storeHtmlTemplate = `<div class="appendedHTML_container theme">
    <section class="products_section">
      <section class="first">
          <div class="store_heading_text">
              <div class="store_heading_container">
                  <i class="fa-solid close_btn fa-arrow-left"></i>
                  <h2 class="store_title">Academlo - Tienda oficial </h2>
              </div>
              <i class="fa-solid close_btn fa-xmark"></i>
          </div>
          <div class="product_section_container">
              <div class="store_product_insights">
                  <p class="store_product_text">{dsp_product_name}</p>
                  <p class="store_product_text">{dsp_product_price}</p>
                  <p class="store_product_description"> {dsp_product_category} oficiales de academlo</p>
                  <p class="store_product_text">Colores</p>
                  <div class="store_product_variants">
                      <img id="img_insertion_1" class="store_img_variant_container" src="{dsp_product_image2}" alt="">
                      
                  </div>
                  <div class="store_sizes_info">
                      <p class="store_product_text">Descripcion</p>
                      <p class="store_product_guide_text"><img src="/public/icons8-info.svg" alt="" width="20px">Sizing Guide</p>
                  </div>
                  <div class="store_product_description">
                      <p>{dsp_product_description}</p>
                  </div>
                  <div class="store_button_container">
                  <button id="add_to_cart" class="store_button" >Añadir</button>
                  </div>
                    <div>
                      <p class='store_product_stock'>En stock: <span>{dsp_product_quantity}</span> </p>
                    </div>
              </div>
              <div class="product_section_display">
                  <div class="theme colored_frame">
      
                  </div>
                  <img class="store_img_product_maximized" src="{dsp_product_image}" width="300px" height="350px" alt="">
              </div>
          </div>
          <div class="store_related_products">
              <h2>Productos relacionados</h2>
              <div class="store_products_display_container" id="productSection">
              {dsp_related_products}
                  
              </div>
          </div>
      </section>
      <section class="store_suscription_container">
          <h2 class="suscribe_section_heading">Mantente en contacto</h2>
          <p class="suscribe_section_text">Suscribite para recibir notificaciones y promociones de nuestros productos</p>
          <div class="store_email_suscription_container">
              <input class="suscribe_input" type="email" placeholder="Escribe tu email"><button class="susbribe_button">SUSCRIBETE</button>
          </div>
      </section>
    </section>
    
    </div>`

  
   function genareteRelatedProducts() {
    function generateRandomNum() {
      let randomProd = Math.floor(Math.random()*17)
      return randomProd
    }
    
      for (let i = 0; i < 5; i++) {
        arrProductsByCategory.push(data[generateRandomNum()])
      }
    
    return arrProductsByCategory
   }
   let relatedProducts = genareteRelatedProducts()
   

    let storeHTML = storeHtmlTemplate.replace("{dsp_related_products}", Array(5).fill(relatedProductsHTML).map((e,i)=>e.replace("{dsp_related_image}",relatedProducts[i].image).replace("{dsp_related_name}",relatedProducts[i].name)).join(''))
  } catch (error) {
    console.error(error);
  }
}

fetchProducts();
