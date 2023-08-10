// Obtenemos los datos del DOM para poderlo manipular.
let getProducts = document.getElementById("get_products");
let getMoreProducts = document.getElementById("get_more_products");

// Guardamos la URL de la API de Academlo en una variable.
let academloAPI = "https://ecommercebackend.fundamentos-29.repl.co/";

// Cargamos el contenido de 'products.html'. Este es un archivo plano de html (sin etiquetas head, meta, etc) que contiene unicamente la estructura que usaremos para desplegar el componente 'products'  
fetch("./components/products.html")
.then((response) => response.text())
.then((htmlDoc) => {
  // Almacenamos el contenido HTML del componente 'products.html' en la variable HTML
  let getAddToCart = document.getElementById("get_add_to_cart");
    let HTML = htmlDoc;

    // Realizamos una petición a la API de Academlo para obtener los datos de los productos
    fetch(academloAPI)
      .then((response) => response.json())
      .then((data) => {
        // Obtenemos el elemento donde se insertarán los productos en el carrito (esto no se puede hacer arriba porque si intentamos acceder a cartInsertion fuera del fetch no lo podría cargar)
        let cartInsertion = document.getElementById("cart_insert_product");
        // declaramos la variable donde almacenaremos el producto seleccionado por el usuario
        let selectedProduct;

        // Creamos un arreglo de objetos con los datos de los productos y el HTML del componente.
        // En sí lo que se hace aquí es que por cada objeto obtenido en el arreglo de la API (data.length) vamos a llenar una posicion del arreglo con el HTML que llamamos del archivo products.html.
        // Es decir, habrá 18 veces la misma estructura de html, entonces si se modifica una vez el archivo products.html se modifica en cada uno de los productos que se va a desplegar en la pagina, esto facilita que sean todos iguales y no necesitar maquetar más de una vez lo mismo.
        const products = Array(data.length).fill(HTML);
        const arrangedData = products.map((product, i) => {
          product = data[i];
          product["html"] = HTML;
          return product;
        });

        // Insertamos los productos en el elemento 'getProducts' que obtuvimos del ID get_products en el index.html
        getProducts.innerHTML = arrangedData
          .map((e, i) => {
            // Reemplaza las variables en el HTML del producto y devuelve esto como valores de arrangeData, el producto completo (incluyendo el HTML que agregamos se sigue guardando en la constante products)
            e.html = HTML.replace("{dsp_product_id}", data[i].id)
              .replace("{dsp_product_image}", data[i].image)
              .replace("{dsp_product_name}", data[i].name)
              .replace("{dsp_product_price}", data[i].price);
            return e.html;
          })
          .join("");

        // Agrega un evento 'click' para cada producto, en este caso el click será valido en la imagen o cualquier parte del cuerpo del producto no solo en el botón. 
        getProducts.addEventListener("click", (e) => {
          let clickedItem = e.target.parentElement ;
          console.log(clickedItem)
          // Encuentra el producto seleccionado
          arrangedData.map((e, i) => {
            if (Number(e.id) === Number(clickedItem.id)) {
              // Lo igualamos a la variable previamente definida 'selectProduct'
              selectedProduct = e;
            }
          });

          // Convertimos el producto seleccionado a formato JSON y se almacena en el localStorage para poderlos recordar independientemente de que el usuario cierre la pagina.
          selectedProduct = JSON.stringify(selectedProduct);
          localStorage.setItem("selectedProduct", selectedProduct);

          // Agrega el producto al carrito 
          let productAdded = JSON.parse(
            localStorage.getItem("selectedProduct")
            
          );
          //aquí se inyecta el HTML tal como vino, sin hacer ninguna modificacion. Si se quisiera cambiar por ejemplo las clases o agregar o quitar elementos se puede usar el metodo .map() para editar cada producto (tener en cuenta que esto los afectaría a todos a menos que se especifiique usando el index del metodo .map())
          cartInsertion.innerHTML += productAdded.html;
          openCart(false)
        });

        // Agregamos un evento 'click' para el botón 'getMoreProducts'
        getMoreProducts.addEventListener("click", () => {
          // Cambia el tamaño de la sección principal añadiendo más espacio para que se desplieguen los productos
          getMain.classList.toggle("change_size");
        });
      })
      .catch((error) => {
        // Muestra un mensaje de error si la API falla
        getProducts.innerHTML = `<h1>El Team 4 lo lamenta. La API nos devuelve un error de tipo:</h1>
                        <p style="color: red; font-size: 25px;">${error}</p>
                        <p>Por favor, refresca la página o vuelve en unos minutos.</p>`;
      });
  });
