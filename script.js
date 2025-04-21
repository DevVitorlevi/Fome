const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const burgerIcon = document.querySelector('.fa-bars');
const menuOverlay = document.querySelector('.menu-overlay');
const animateElements = document.querySelectorAll('.animate-element');

// Cria uma nova instância do IntersectionObserver para observar quando os elementos entram na tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Adiciona a classe 'show' quando o elemento entra na viewport (tela)
            entry.target.classList.add('show');
            // Para de observar o elemento após ele aparecer
            observer.unobserve(entry.target);
        }
    });
});

// Observa cada elemento com a classe 'animate-element'
animateElements.forEach((element) => observer.observe(element));

// Alterna o menu mobile ao clicar no botão
mobileMenuBtn.addEventListener('click', () => {
    // Adiciona ou remove a classe 'active' do menu
    mobileNav.classList.toggle('active');
    // Alterna o ícone de hamburguer para 'x' e vice-versa
    burgerIcon.classList.toggle('fa-x');
    
    // Adiciona ou remove o overlay de fundo dependendo do estado do menu
    if (mobileNav.classList.contains('active')) {
        menuOverlay.classList.add('active');
    } else {
        menuOverlay.classList.remove('active');
    }
});

// Fecha o menu ao clicar em um item de menu
mobileNav.addEventListener('click', (e) => {
    // Verifica se o clique foi em um item de menu
    if (e.target.closest('.menu-item')) {
        // Fecha o menu e o overlay
        mobileNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        // Troca o ícone de volta para o hamburguer
        burgerIcon.classList.replace('fa-x', 'fa-bars');
    }
});

// Fecha o menu ao clicar fora (no overlay)
menuOverlay.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    mobileNav.classList.remove('active');
    burgerIcon.classList.replace('fa-x', 'fa-bars');
});
