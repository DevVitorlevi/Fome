const api = 'http://localhost:3000/api';

function showFlashMessage(mensagem, tipo = 'success') {
  const flash = document.getElementById('flash-message');
  if (!flash) return;

  flash.textContent = mensagem;
  flash.className = `flash ${tipo}`; // Isso substitui inclusive a 'hidden'
  
  // Remove a classe 'hidden' se ainda estiver
  flash.classList.remove('hidden');

  setTimeout(() => {
    flash.classList.add('hidden');
  }, 3000);
}

// Cadastro
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
      const cadastroResponse = await axios.post(`${api}/cadastro`, { nome, email, senha });
      showFlashMessage(cadastroResponse.data.mensagem, 'success');

      const loginResponse = await axios.post(`${api}/login`, { email, senha });
      localStorage.setItem('user', JSON.stringify(loginResponse.data.usuario));
      window.location.href = '../../Home/HomePage.html';
    } catch (err) {
      const msg = err.response?.data?.mensagem || 'Erro no cadastro (sem mensagem detalhada)';
      showFlashMessage(msg, 'error');
    }
  });
}

// Login
const formLogin = document.getElementById('form-login');
if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    try {
      const res = await axios.post(`${api}/login`, { email, senha });
      localStorage.setItem('user', JSON.stringify(res.data.usuario));
      window.location.href = '../../Home/HomePage.html';
    } catch (err) {
      const msg = err.response?.data?.mensagem || 'Erro no login';
      showFlashMessage(msg, 'error');
    }
  });
}

// Home
const userInfo = JSON.parse(localStorage.getItem('user'));
if (userInfo) {
  const nomeSpan = document.getElementById('user-nome');
  const emailSpan = document.getElementById('user-email');

  if (nomeSpan) nomeSpan.textContent = `Olá, ${userInfo.nome}`;
  if (emailSpan) emailSpan.textContent = userInfo.email;
}
