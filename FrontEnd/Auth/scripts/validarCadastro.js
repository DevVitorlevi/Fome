const Form =  document.getElementById('form-cadastro');
const Inputs = [...document.querySelectorAll('.input')];
const RequiredFields = [...document.querySelectorAll('.required')];
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const mostrarSenha = document.querySelector('.bi-eye');

Form.addEventListener('submit', impedirEnvio);
Inputs[0].addEventListener('input', validarNome);
Inputs[1].addEventListener('input', validarEmail);

function impedirEnvio(e){
    e.preventDefault();
    validarNome();
    validarEmail();
}

document.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        impedirEnvio();
    }
})

function error(i){
    Inputs[i].style.border = '2px solid red';
    RequiredFields[i].style.display = 'block';
}

function notError(i){
    Inputs[i].style.border = '';
    RequiredFields[i].style.display = 'none';
}

function validarNome(){
    if(Inputs[0].value.trim().length < 3){
        return error(0);
    }
    return notError(0);
}

function validarEmail(){
    if(emailRegex.test(Inputs[1].value)){
        return notError(1);
    }
    return error(1);
}

mostrarSenha.addEventListener('click', ()=>{
    if (Inputs[2].type === 'password'){
        Inputs[2].setAttribute('type', 'text')
        mostrarSenha.classList.replace('bi-eye', 'bi-eye-slash')
    } else {
        Inputs[2].setAttribute('type', 'password')
        mostrarSenha.classList.replace('bi-eye-slash', 'bi-eye')
    }
})

const senhaInput = document.getElementById('senha');
const senhaRegras = document.getElementById('senha-regras');
let firstFocus = false;

senhaInput.addEventListener('focus', () => {
    if (!firstFocus) {
        firstFocus = true;
    }
    senhaRegras.classList.add('visible');
    senhaRegras.classList.remove('hidden');
    
    // adiciona margem para empurrar o botão para baixo
    senhaInput.parentElement.classList.add('margin-for-regras');
});

senhaInput.addEventListener('blur', () => {
    senhaRegras.classList.remove('visible');
    senhaRegras.classList.add('hidden');
    
    // remove margem quando a div some
    senhaInput.parentElement.classList.remove('margin-for-regras');
});

senhaInput.addEventListener('blur', () => {
    // Opcional: esconder ao perder foco, ou deixar fixo mesmo?
    // Se quiser deixar fixo mesmo, comenta o código abaixo:
    senhaRegras.classList.remove('visible');
    senhaRegras.classList.add('hidden');
});

// Atualize a função validarSenha para mudar os ícones conforme as regras
senhaInput.addEventListener('input', () => {
    const val = senhaInput.value;

    // Critérios
    const hasUppercase = /[A-Z]/.test(val);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasLength = val.length >= 8;

    updateRule('rule-uppercase', hasUppercase);
    updateRule('rule-specialchar', hasSpecialChar);
    updateRule('rule-number', hasNumber);
    updateRule('rule-length', hasLength);
});

function updateRule(id, valid) {
    const li = document.getElementById(id);
    const icon = li.querySelector('.icon');

    if (valid) {
        icon.classList.remove('bi-x-circle-fill', 'red');
        icon.classList.add('bi-check-circle-fill', 'green');
    } else {
        icon.classList.remove('bi-check-circle-fill', 'green');
        icon.classList.add('bi-x-circle-fill', 'red');
    }
}

