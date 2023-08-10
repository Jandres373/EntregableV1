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
let glowingItem = document.querySelector('.glowing_item')
let hexagon  = document.querySelector('.hexagon')
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
    glowingItem.classList.add('activate_dark_mode_additions')
    hexagon.classList.add('activate_dark_mode_additions')
    
    getToggle.classList.add('nav_bar_toggle_function');
    getToggle.classList.add('darker_mode_background');
    theme.forEach(element => {
      element.classList.add('dark_mode');
    });
    themeDarker.forEach(element => {
      element.classList.add('darker_mode');
    });
    themeContent.forEach(element => {
      element.classList.add('dark_mode_text');
    });
    // console.log(window.localStorage.getItem('theme_mode')) - removed for production
  } else {
    glowingItem.classList.remove('activate_dark_mode_additions')
    hexagon.classList.remove('activate_dark_mode_additions')
    getToggle.classList.remove('nav_bar_toggle_function');
    getToggle.classList.remove('darker_mode_background');
    theme.forEach(element => {
      element.classList.remove('dark_mode');
    });
    themeDarker.forEach(element => {
      element.classList.remove('darker_mode');
    });
    themeContent.forEach(element => {
      element.classList.remove('dark_mode_text');
    });
    console.log(window.localStorage.getItem('theme_mode'))
  }
}

getToggle.addEventListener('click', () => {
  activateToggle()
  displayTheme()
});
