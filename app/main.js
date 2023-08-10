let activeThemeMode = window.localStorage.getItem('theme_mode');
// navbar Code (carrito y toggle)
// **Toggle y navBar**
const getToggle = document.getElementById('get_toggle');
let theme = document.querySelectorAll('.theme');
let themeContent = document.querySelectorAll('.themeContent');
let themeDarker = document.querySelectorAll('.darker_theme');
let banner = document.querySelector('.banner');
let footer = document.querySelector('.footer');
let navBarContent = document.querySelectorAll('.nav_theme_content');
const getNavBar = document.getElementById('get_navBar');
const getMain = document.getElementById('get_main');

window.addEventListener('load', () => {
  // Después de cargar la página, mostrar el contenido y aplicar el tema
  displayTheme();
  setTimeout(() => {
    let loader = document.querySelector('.loader')
    loader.style.opacity = '0'
    loader.style.visibility = 'hidden';
    document.body.style.overflowY = 'visible';
    document.body.style.overflowX = 'hidden';
  }, 1100);
  setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
  }, 950);
});

//Funcion para activar el cambio de tema:
displayTheme()
function activateToggle() {
  (window.localStorage.getItem('theme_mode')==='dark') ? window.localStorage.setItem('theme_mode' , 'light' ) : window.localStorage.setItem('theme_mode' , 'dark' )
}

function displayTheme() {
  if (window.localStorage.getItem('theme_mode') === 'dark') {
    getToggle.classList.add('nav_bar_toggle_function');
    getToggle.classList.add('darker_mode_background');
    theme.forEach(element => {
      element.classList.add('dark_mode');
    });
    themeDarker.forEach(element => {
      element.classList.add('darker_mode');
    });
    themeContent.forEach(element => {
      element.classList.add('dark_mode');
    });
    console.log(window.localStorage.getItem('theme_mode'))
  } else {
    getToggle.classList.remove('nav_bar_toggle_function');
    getToggle.classList.remove('darker_mode_background');
    theme.forEach(element => {
      element.classList.remove('dark_mode');
    });
    themeDarker.forEach(element => {
      element.classList.remove('darker_mode');
    });
    themeContent.forEach(element => {
      element.classList.remove('dark_mode');
    });
    console.log(window.localStorage.getItem('theme_mode'))
  }
}

getToggle.addEventListener('click', () => {
  activateToggle()
  displayTheme()
});

function activateScroll(scrollStart) {
  window.addEventListener('scroll', () => {
    let scroll = scrollStart
    scroll = getMain.getBoundingClientRect();
    let isBelowTheBaner = true; 
    isBelowTheBaner = (scroll.y <= 0 ? true : false)
    console.log(isBelowTheBaner)
    //console.log(isThemeLight)
  /*  if (isBelowTheBaner&&isThemeLight) {
    console.log('el tema es claro y estoy bajo el banner')
    getNavBar.style.backgroundColor = 'blue'
   } else if (!isBelowTheBaner&&isThemeLight) {
    console.log('el tema es claro y estoy sobre el banner')
    getNavBar.style.backgroundColor = 'yellow'
   } else if (!isBelowTheBaner&&!isThemeLight) {
    console.log('el tema es oscuro y estoy sobre el baner')
    getNavBar.style.backgroundColor = 'green'
   } else if (isBelowTheBaner&&!isThemeLight) {
    console.log('el tema es oscuro y estoy bajo el banner')
    getNavBar.style.backgroundColor = 'black'
   } */
  });
}


/* Aquí va el JS del carrito */
//

/* getToggle.classList.toggle('nav_bar_toggle_function');
getToggle.classList.toggle('darker_mode_background');
// Toggle classes for banner and footer
theme.forEach(element => {
  element.classList.toggle('dark_mode');
});
themeDarker.forEach(element => {
  element.classList.toggle('darker_mode');
});
themeContent.forEach(element => {
  element.classList.toggle('dark_mode');
}); */


/* 

getToggle.classList.toggle('nav_bar_toggle_function');
  getToggle.classList.toggle('darker_mode_background');
  // Toggle classes for banner and footer
  theme.forEach(element => {
    element.classList.toggle('dark_mode');
  });
  themeDarker.forEach(element => {
    element.classList.toggle('darker_mode');
  });
  themeContent.forEach(element => {
    element.classList.toggle('dark_mode');
  });

// local storage, variables y constantes globales
window.localStorage.setItem('theme_mode' , 'true')
let isThemeLight = JSON.parse(window.localStorage.getItem('theme_mode'));


// navbar Code (carrito y toggle)
// **Toggle y navBar**
const getToggle = document.getElementById('get_toggle');
let theme = document.querySelectorAll('.theme');
let themeContent = document.querySelectorAll('.themeContent');
let themeDarker = document.querySelectorAll('.darker_theme');
let banner = document.querySelector('.banner');
let footer = document.querySelector('.footer');
let navBarContent = document.querySelectorAll('.nav_theme_content');
const getNavBar = document.getElementById('get_navBar');
const getMain = document.getElementById('get_main');

console.log("El programa se ha iniciado"); // Esto se ejecuta al iniciar el programa

// Ejecutar la función para que se ejecute el console.log inicialmente
  activateScroll();
getToggle.addEventListener('click', () => {
  isThemeLight = JSON.parse(localStorage.getItem('theme_mode'));
  
  function activateToggle() {
    console.log(isThemeLight)
  }
  activateToggle()
});


window.addEventListener('scroll' , ()=>{
  let scroll = getMain.getBoundingClientRect();
  console.log(scroll.y)
  
    if (isThemeLight) {
      if (scroll.y<=0) {
        getNavBar.classList.add('red_mode')
        getNavBar.classList.add('light_mode_text')
        getNavBar.classList.remove('light_mode')
        navBarContent.forEach(element => {
          element.classList.add('dark_mode_text')
        });
      } else if (scroll.y>=0) {
        getNavBar.classList.add('light_mode')
        getNavBar.classList.remove('red_mode')
        navBarContent.forEach(element => {
          element.classList.remove('dark_mode_text')
        });
      }
    }
})


 // Toggle classes for themeContent
   themeContent.forEach(element => {
     if (theme[0].classList.contains('dark_mode')) {
      element.classList.add('dark_mode_text');
      element.classList.remove('ligth_mode_text');
     } else if (theme[0].classList.contains('red_mode')) {
       element.classList.remove('ligth_mode_text');
       element.classList.add('dark_mode_text');
     } else {
      element.classList.add('ligth_mode_text');
      element.classList.remove('dark_mode_text');
     }
   });

*/