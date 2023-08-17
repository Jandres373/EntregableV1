// Obtenemos los elementos del DOM para su manipulación.
let getProducts = document.getElementById("get_products");
let getSelect = document.getElementById("get_select");
let getStore = document.querySelector("#get_store");
let cartActivator = document.querySelector(".fa-cart-shopping");
let getMore = document.getElementById("get_more_products");

// Guardamos la URL de la API de Academlo en una variable.
let academloAPI = "https://ecommercebackend.fundamentos-29.repl.co/";

// creamos variables para controlar el estado del carrito
let isCarOpen = false;
let productsArray = [];
let arrProductsByCategory = [];
let objectsInCart = { productAPIdata: [], productHTML: [] ,  amount: []  };
let selectedProductCart;
let productHTML;
let getProductNumberDisplay;


cartActivator.addEventListener("click", () => {
  toggleCart();
});
getMore.addEventListener("click", () => {
  expandProducts();
});
function expandProducts() {
  getProducts.classList.toggle("expand_products");
}
function renderProduct() {
  let getCart = document.getElementById("get_cart");
  getProductNumberDisplay = document.querySelector(
    "#get_product_number_display"
  );
  productHTML = `<div class="product">
        <img src="{dsp_product_image}" alt="Playera negra - logo blanco">
                            <div class="product-details">
                            <p class="product-name">{dsp_product_name}</p>
                            <p class="product-price">{dsp_product_price}</p>
                              <div class="quantity">
                              <i class="fa-solid fa-angle-down"></i>
                                <p class="product-quantity">1</p>
                                <i class="fa-solid fa-angle-up"></i>
                                <button class="remove-btn"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                                </div>
                                </div>`;
  getCart.innerHTML = `
        <body>
  <div class=" container">
    <h1 class=" cart-title theme_content"> <i id="close_cart_btn" class="fa-solid  fa-xmark"></i> </h1>
    <div id="cart_product_insertion">
    </div>
    <div id="cart-insert-product" class="cart-display-selected-products">
    </div>
    <div class="cart-total">
      <p id="sub_total" class="total-line"><span class="plane_text">Subtotal:</span> $</p>
      <p id="shipping" class="total-line"><span class="plane_text">Envío:</span> $</p>
      <p id="total" class="total-line"><span class="plane_text">Total:</span> $</p>
    </div>
    <div class="contact-data">
      <h2>Datos de Contacto</h2>
      <label for="user">Nombre(s)*</label><br>
      <input type="text" id="user"><br>
      <label for="lastName">Apellido(s)*</label><br>
      <input type="text" id="lastName"><br>
      <label for="email">Correo Electrónico*</label><br>
      <input type="email" id="email"><br>
    </div>
    <div class="shipping-address">
      <h2>Dirección de Envío</h2>
      <label for="direction">Dirección de Envío*</label><br>
      <input type="text" id="direction"><br>
      <label for="city">Ciudad de Residencia*</label><br>
      <input type="text" id="city"><br>
      <label for="code">Código Postal*</label><br>
      <input type="number" id="code"><br>
      <label for="country">País*</label><br>
      <select id="country">
        <option value="Colombia">Colombia</option>
        <option value="Mexico">México</option>
        <option value="Peru">Perú</option>
        <option value="otherCountry">Otro país</option>
      </select>
    </div>
    <div class="buttons">
      <button class="confirm-btn" type="button">Confirmar Compra</button>
      <button class="continue-shopping-btn" type="button">Continuar Comprando</button>
    </div>
    <div class="spacer"></div>
  </div>
</body>
`;
  productHTML = productHTML
    .replace("{dsp_product_image}", selectedProductCart.image)
    .replace("{dsp_product_name}", selectedProductCart.name)
    .replace("{dsp_product_price}", `$${selectedProductCart.price}.00`)
    .replace("{dsp}", objectsInCart.amount.length === 0 ? 1 : 1)
    .replace("{dsp_product_quantity}", selectedProductCart.quantity);
    
}
function handleCartInsertion() {
  let cartInsertion = document.getElementById("cart_product_insertion");
  if (cartInsertion) {
    cartInsertion.innerHTML += objectsInCart.productHTML.join("");
  }
}
function addProductToCart() {
  let getCart = document.getElementById("get_cart");
  let addToCart = document.getElementById("add_to_cart");
  
  addToCart.addEventListener("click", () => {
    selectedProductCart = localStorage.getItem("selectedProduct");
    selectedProductCart = JSON.parse(selectedProductCart);
    openCart();
    renderProduct();
    let closeCartBtn = document.getElementById("close_cart_btn");
    closeCartBtn.addEventListener("click", () => {
      closeCart();
    });
    
    if (!objectsInCart.productHTML.includes(productHTML)) {
    objectsInCart.productAPIdata.push(selectedProductCart);
    objectsInCart.productHTML.push(productHTML);
    objectsInCart.amount.push(1)
    
   ;
    } else {
      popModal("var(--secondary-color)", "Este producto ya está en tu carrito");
    }
    renderProduct();

    suscribeToEmail()
    deleteProduct();
    handleCartInsertion();
    increaseProductCount()
    decreaseProductCount()
    confirmPurchase()
    updateProductsCount();
    

    /* if (objectsInCart.productHTML.includes(productHTML)) {
      popModal("risk", "Este producto ya está en tu carrito");
    } */
  });
}
function deleteProduct() {
  let cartInsertion = document.getElementById("cart_product_insertion");

  cartInsertion.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-trash-can")) {
      let productContainer = e.target.closest(".product");
      let productNameElement = productContainer.querySelector(".product-name");

      if (productNameElement) {
        const productName = productNameElement.textContent;

        const selectedProductIndex = objectsInCart.productHTML.findIndex(
          (item) => item.includes(productName)
        );

        if (selectedProductIndex !== -1) {
          objectsInCart.productHTML.splice(selectedProductIndex, 1);
          objectsInCart.productAPIdata.splice(selectedProductIndex, 1);

          // Eliminar el producto del DOM
          productContainer.remove(); // Eliminamos directamente el elemento del DOM

          // Actualizar el contador de productos
          updateProductsCount();
        }
      }
    }
  });
}
function increaseProductCount() {
  computateValues()
  let cartInsertion = document.getElementById("cart_product_insertion");
  cartInsertion.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-angle-up")) {
      let quantityForIncrease = e.target.closest(".quantity");
      let productContainer = e.target.closest(".product");
      let productIndex = Array.from(cartInsertion.children).indexOf(productContainer);
      let quantitySelector = quantityForIncrease.querySelector(".product-quantity");
      let quantityText = parseInt(quantitySelector.textContent);
      
      let updatedProductHTML = objectsInCart.productHTML[productIndex].replace(/>[0-9]</g, `>${quantityText + 1}<`);
      objectsInCart.productHTML[productIndex] = updatedProductHTML;

      if (quantityText < Number(objectsInCart.productAPIdata[productIndex].quantity)) {
        quantitySelector.textContent = quantityText + 1;
        objectsInCart.amount[productIndex] = quantityText + 1;
        console.log(objectsInCart.amount)
      } else {
        popModal("var(--primary-color)", "Lo sentimos, no hay más de este producto en stock")
      }
    }
    computateValues()
  });
}
function decreaseProductCount() {
  let cartInsertion = document.getElementById("cart_product_insertion");
  cartInsertion.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-angle-down")) {
      let quantityForIncrease = e.target.closest(".quantity");
      let productId = e.target.closest(".product");
      let quantitySelector = quantityForIncrease.children[1]
      let quantityText = quantityForIncrease.children[1].textContent
      if (quantityText > 0) {
        quantitySelector.textContent = Number(quantityText) -1
      } else {
        popModal("var(--primary-color)","debes seleccionar al menos 1 producto")
      }
    }
    computateValues()
  });
  
  /* let productContainer = e.target.closest(".product");
  let upArrow = productContainer.querySelector("fa-angle-up"); */
}
function updateProductsCount() {
  let getProductNumberDisplay = document.querySelector(
    "#get_product_number_display"
  );
  getProductNumberDisplay.textContent = objectsInCart.productHTML.length;
}
function computateValues() {
  // Obtenemos los elementos del DOM
  let cartInsertion = document.getElementById("cart_product_insertion");
  let subTotal = document.getElementById('sub_total');
  let shipping = document.getElementById('shipping');
  let total = document.getElementById('total');
  let insertedChildren = Array.from(cartInsertion.children);
  let quantitiesAdded = document.querySelectorAll('.product-quantity');
  
  // Creamos arreglos con las cantidades y precios de los productos
  let arrQuantities = Array.from(quantitiesAdded).map(node => Number(node.innerText));
  let arrPrices = objectsInCart.productAPIdata.map(product => product.price);
  
  // Calculamos el valor total para cada producto multiplicando la cantidad seleccionada por el precio
  let subTotalValue = 0;
  for (let i = 0; i < arrQuantities.length; i++) {
    subTotalValue += arrQuantities[i] * arrPrices[i];
  }
  
  // Calculamos el valor del envío
  let shippingValue = subTotalValue > 0 ? 7 : 0;

  // Actualizamos los elementos del DOM con los valores calculados
  subTotal.textContent = `Sub total: $${subTotalValue.toFixed(2)}`;
  shipping.textContent = `Envío: $${shippingValue.toFixed(2)}`;
  total.textContent = `Total: $${(subTotalValue + shippingValue).toFixed(2)}`;
}

function popModal(type, warning) {
  let modal = document.querySelector(".modal");
  let cartActivator = document.querySelector(".fa-cart-shopping");
  let warnMessage = modal.firstElementChild.lastElementChild

  warnMessage.textContent = warning
  modal.classList.add("popModal");
  modal.setAttribute("style", `background-color: ${type};`);

  cartActivator.classList.add("fa-shake");
  setTimeout(() => {
    cartActivator.classList.remove("fa-shake");
  }, 800);
  setTimeout(() => {
    modal.classList.remove("popModal");
  }, 3000);
}
function openCart() {
  let getCart = document.getElementById("get_cart");
  let cartActivator = document.querySelector(".fa-cart-shopping");
  let getProductNumberDisplay = document.querySelector(
    "#get_product_number_display"
  );
  suscribeToEmail()
  getNavBar.classList.add("adjust_border_radius");
  getCart.classList.add("show_cart");
  //controla el movimiento del carrito al agregar un producto
  cartActivator.classList.add("fa-bounce");
  setTimeout(() => {
    cartActivator.classList.remove("fa-bounce");
  }, 800);
  isCarOpen = true;
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
  isCarOpen = false;
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
function suscribeToEmail() {
  let suscribeBtn = document.querySelector('.susbribe_button')
  if (suscribeBtn) {
    suscribeBtn.addEventListener('click', () => {
      popModal('green','Gracias por suscribirte :D ')
    })
  }
  
}
function confirmPurchase() {
  let confirmBtn = document.querySelector('.confirm-btn')
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      popModal('green','Apreciamos tu compra')
    })
  }
  
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
        arrProductsByCategory = filteredProducts;
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
            .replace("{dsp_product_description}", selectedProduct.description)
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
                                </div>`;

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
    
    </div>`;
    
    function genareteRelatedProducts() {
      function generateRandomNum() {
        let randomProd = Math.floor(Math.random() * 17);
        return randomProd;
      }

      for (let i = 0; i < 5; i++) {
        arrProductsByCategory.push(data[generateRandomNum()]);
      }

      return arrProductsByCategory;
    }
    let relatedProducts = genareteRelatedProducts();

    let storeHTML = storeHtmlTemplate.replace(
      "{dsp_related_products}",
      Array(5)
        .fill(relatedProductsHTML)
        .map((e, i) =>
          e
            .replace("{dsp_related_image}", relatedProducts[i].image)
            .replace("{dsp_related_name}", relatedProducts[i].name)
        )
        .join("")
    );
    
  } catch (error) {
    console.error(error);
  }
}
fetchProducts();
