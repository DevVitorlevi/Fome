const api = 'http://localhost:3000/api';
function showFlashMessage(mensagem, tipo = 'success') {
  const flash = document.getElementById('flash-message');
  if (!flash) return;

  flash.textContent = mensagem;
  flash.className = `flash ${tipo}`;
  
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
      setTimeout(async () => {
        const loginResponse = await axios.post(`${api}/login`, { email, senha });
        localStorage.setItem('user', JSON.stringify(loginResponse.data.usuario));
        window.location.href = '../../Home/HomePage.html';
      }, 2000);

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

// Logout
function logout() {

  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href = '../Auth/Login/Login.html';
}
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}

// Home e Profile
const userInfo = JSON.parse(localStorage.getItem('user'));
if (userInfo) {
  const nomeSpan = document.getElementById('user-nome');
  const emailSpan = document.getElementById('user-email');
  const showName = document.getElementById('user-name');

  if (nomeSpan) nomeSpan.innerHTML = `Seja Bem-Vindo, ${userInfo.nome} Ao <span> Restaurante Fome!! </span>`;
  if (emailSpan) emailSpan.innerHTML = `E-mail: ${userInfo.email}`;
  if (showName) showName.innerHTML =`Nome: ${userInfo.nome}`;


}
