// Pega os elementos do HTML
const mobileMenuBtn = document.getElementById('mobile-menu-btn')
const mobileNav = document.getElementById('mobile-nav')
const burgerIcon = document.querySelector('.fa-bars')
const menuOverlay = document.querySelector('.menu-overlay')
const animateElements = document.querySelectorAll('.animate-element')
const btnTop = document.getElementById('btnTop')

// Mostra o botão "voltar ao topo" quando rolar mais de 300px
window.addEventListener('scroll', () => {
  window.scrollY > 300 ? btnTop.style.display = 'block' : btnTop.style.display = 'none'
})

// Quando clicar no botão "voltar ao topo", a página rola suavemente até o topo
btnTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

// Cria um observador que detecta quando os elementos aparecem na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Quando o elemento aparece, adiciona a classe 'show'
      entry.target.classList.add('show')
      // Para de observar o elemento depois de mostrar
      observer.unobserve(entry.target)
    }
  })
})

// Observa todos os elementos com a classe 'animate-element'
animateElements.forEach((element) => observer.observe(element))

// Abre ou fecha o menu quando clicar no botão do menu
mobileMenuBtn.addEventListener('click', () => {
  // Ativa ou desativa o menu
  mobileNav.classList.toggle('active')
  // Troca o ícone de hambúrguer por um X e vice-versa
  burgerIcon.classList.toggle('fa-x')

  // Mostra ou esconde o fundo escuro (overlay)
  if (mobileNav.classList.contains('active')) {
    menuOverlay.classList.add('active')
  } else {
    menuOverlay.classList.remove('active')
  }
})

// Fecha o menu ao clicar em um item dentro dele
mobileNav.addEventListener('click', (e) => {
  // Verifica se clicou em um item do menu
  if (e.target.closest('.menu-item')) {
    mobileNav.classList.remove('active')
    menuOverlay.classList.remove('active')
    // Troca o ícone de volta para o hambúrguer
    burgerIcon.classList.replace('fa-x', 'fa-bars')
  }
})

// Fecha o menu ao clicar fora dele (no fundo escuro)
menuOverlay.addEventListener('click', () => {
  menuOverlay.classList.remove('active')
  mobileNav.classList.remove('active')
  burgerIcon.classList.replace('fa-x', 'fa-bars')
})
