const api = 'http://localhost:3000/api';

// Cadastro
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', async (e) => {    
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
      console.log('Tentando cadastrar...', { nome, email, senha });
      const cadastroResponse = await axios.post(`${api}/cadastro`, { nome, email, senha });
      console.log('Cadastro response:', cadastroResponse.data);
      
      // Após cadastro, já realiza o login automático
      console.log('Tentando login automático...');
      const loginResponse = await axios.post(`${api}/login`, { email, senha });
      console.log('Login response:', loginResponse.data);
      
      localStorage.setItem('user', JSON.stringify(loginResponse.data.usuario));
      window.location.href = '../Home/HomePage.html'; // Ajuste conforme necessário
    } catch (err) {
      console.error('Erro detalhado:', err);
      alert(err.response?.data?.mensagem || 'Erro no cadastro');
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
      window.location.href = '../Home/HomePage.html';
    } catch (err) {
      alert(err.response.data.mensagem || 'Erro no login');
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
