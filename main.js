// MENU ----

const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}

//mudar header
const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    header.classList.add('scroll')
  } else {
    header.classList.remove('scroll')
  }
}

// COPIAR IP ----

const copyip = document.querySelector('#home .grid .copiarip')
const copiado = document.querySelector('#home .grid .copiarip .copyz')

copyip.addEventListener('click', ipcopy)

function ipcopy(e) {
  navigator.clipboard.writeText('jogar.dynastynetwork.com.br')
  copiado.classList.add('on')
  copiado.innerText = 'Copiado com sucesso'

  setTimeout(function () {
    copiado.classList.add('off')
  }, 1000),
    setTimeout(function () {
      copiado.classList.remove('on')
      copiado.innerText = 'Clique para copiar'
    }, 2000),
    setTimeout(function () {
      copiado.classList.remove('off')
    }, 4000)
}

// staffs carousel slider swiper

const swiper = new Swiper('#staff .swiper-container', {
  slidesPerView: 1,
  pagination: { el: '#staff .swiper-pagination' },
  keyboard: true,

  breakpoints: {
    // when window width is >= 320px
    // when window width is >= 640px
    820: {
      slidesPerView: 2,
      setWrapperSize: true
    }
  }
})

// scroll reveal
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(`
  #home .vserver, #home .text,
  #about .skinsmine, #about .text,
  #vip .text, #vip .card,
  #staff .title, #staff .titlestaff, #staff .staffs,
  #contact .text, #contact .links,
  footer .brand, footer .social
`)

/* back to top  */
const backToTopButton = document.querySelector('.back-to-top')

function backToTop() {
  if (this.window.scrollY >= 800) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

/* menu ativo */

const sections = document.querySelectorAll('main section[id]')

function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

/* When scroll */
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})

// MUDAR TEMA JANELA

const pegarT = document.querySelector('#header blockquote label')
const themeMode = document.querySelector('#header blockquote .alterado')

pegarT.addEventListener('click', function () {
  if (themeMode.classList.contains('light')) {
    themeMode.classList.remove('light')
    themeMode.innerText = 'Tema atual: Escuro'
    themeMode.classList.add('dark')
  } else {
    themeMode.classList.remove('dark')
    themeMode.innerText = 'Tema atual: Claro'
    themeMode.classList.add('light')
  }
})

/* DARK & LIGHT MODE */
const htmldl = document.querySelector('html')
const checkboxdl = document.querySelector('input[name=theme]')

const getStyle = (element, style) =>
  window.getComputedStyle(element).getPropertyValue(style)

const initialColors = {
  headerColor: getStyle(htmldl, '--header-color'),
  headerBorder: getStyle(htmldl, '--header-border'),
  background: getStyle(htmldl, '--background'),
  baseColor: getStyle(htmldl, '--base-color'),
  baseColorSecond: getStyle(htmldl, '--base-colorsecond'),
  titlesColor: getStyle(htmldl, '--titles-color'),
  white: getStyle(htmldl, '--white'),
  black: getStyle(htmldl, '--black'),
  cardsColor: getStyle(htmldl, '--cards-color'),
  dividerColor: getStyle(htmldl, '--divider-color')
}

const darkMode = {
  headerColor: '#2B2B2B',
  headerBorder: '#262626',
  background: '#0C0C0C',
  baseColor: '#00BFFF',
  baseColorSecond: '#DBDBDB',
  titlesColor: '#F9F9F9',
  white: '#F9F9F9',
  black: '#0C0C0C',
  cardsColor: '#141414',
  dividerColor: '#F2F2F2'
}

const transformKey = key => '--' + key.replace(/([A-Z])/, '-$1').toLowerCase()

const changeColors = colors => {
  Object.keys(colors).map(key =>
    htmldl.style.setProperty(transformKey(key), colors[key])
  )
}

checkboxdl.addEventListener('change', ({ target }) => {
  target.checked ? changeColors(darkMode) : changeColors(initialColors)
})
