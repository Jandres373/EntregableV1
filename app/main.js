//local storage, variables y constantes globales
let isThemeLight = true
localStorage.setItem('theme mode', isThemeLight)
isThemeLight = JSON.parse(localStorage.getItem('theme mode'));
//navbar Code (carrito y toggle)
//**Toggle y navBar*/
const getToggle = document.getElementById('get_toggle')
let theme = document.querySelectorAll('.theme')
let themeContent = document.querySelectorAll('.themeContent')
let banner = document.querySelector('.banner')
let footer = document.querySelector('.footer')
getToggle.addEventListener('click', ()=>{
  
  
  getToggle.style.justifyContent==='start' ? getToggle.style.justifyContent = 'end' : getToggle.style.justifyContent = 'start';
  
  getToggle.style.backgroundColor==='rgba(222, 216, 216, 0.992)' 
  ? (getToggle.style.backgroundColor = 'var(--secondary-color)' , getToggle.firstElementChild.style.backgroundColor = 'var(--color-base)' , getToggle.firstElementChild.firstElementChild.style.color = 'var(--secondary-color)' )
  : getToggle.style.backgroundColor = 'rgba(222, 216, 216, 0.992)';
  
  
  theme.forEach(element => {
    isThemeLight ?   element.style.backgroundColor = '#2b356e' : element.style.backgroundColor = 'var(--color-base)'
  });
  
  themeContent.forEach(element => {
    !isThemeLight ? element.style.color = 'var(--secondary-color)' :  element.style.color = 'white'
  });
  
  !isThemeLight ? banner.style.backgroundColor = 'var(--primary-color)' :
  banner.style.backgroundColor = 'var(--primary-color-dark)'

  !isThemeLight ? footer.style.backgroundColor = 'var(--primary-color)' :
  footer.style.backgroundColor = 'var(--primary-color-dark)'
  
  isThemeLight= !isThemeLight
})

const getNavBar = document.getElementById('get_navBar')
const getMain = document.getElementById('get_main')

window.addEventListener('scroll' , ()=>{
  let scroll = getMain.getBoundingClientRect();

    if (isThemeLight) {
      scroll.y<=0 ? getNavBar.style.backgroundColor = 'var(--primary-color)' :  getNavBar.style.backgroundColor = 'var(--color-base)';
      themeContent.forEach(element => {
        (scroll.y<=0 && element.style.color) ? element.style.color = 'white' :element.style.color = 'var(--secondary-color)'
      })
      themeContent[4].style.color = 'var(--secondary-color)';
    } 
})

//**Carrito */

/* Aquí va el JS del carrito */
//

