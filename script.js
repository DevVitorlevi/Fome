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
