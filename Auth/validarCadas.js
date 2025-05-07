const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const form = document.getElementById('form')
const inputs = [...document.querySelectorAll('.input')]
const required = [...document.querySelectorAll('.required')]
//Ações
document.addEventListener('keydown', ev => {
    if (ev.key === 'Enter') {
        impedirEnvio(evt)
    }
})
form.addEventListener('submit', impedirEnvio)
inputs[0].addEventListener('input', ValidarNome)
inputs[1].addEventListener('input', ValidarEmail)
inputs[2].addEventListener('input', ValidarSenha)
inputs[3].addEventListener('input', ValidarConfirmSenha)

function impedirEnvio(evt) {
    evt.preventDefault()
    ValidarNome()
    ValidarEmail()
    ValidarSenha()
    ValidarConfirmSenha()
}

function Casoerror(indice) {
    inputs[indice].style.border = '2px solid #EB3942'
    required[indice].style.display = 'block'
}
function Noterror(indice) {
    inputs[indice].style.border = ''
    required[indice].style.display = 'none'
}

function ValidarNome(){
    if(inputs[0].value.length < 3){
        return Casoerror(0)
    }
    return Noterror(0)
}

function ValidarEmail() {
    if (emailRegex.test(inputs[1].value)) {
        return Noterror(1)
    }

    return Casoerror(1)
}

function ValidarSenha() {
    const senha = inputs[2].value;
    const contemLetra = /[a-zA-Z]/.test(senha);
    const contemNumero = /[0-9]/.test(senha);
    const senhaEhCurta = senha.length < 8;

    if (senhaEhCurta) {
        return Casoerror(3)
    }

    if (!contemLetra || !contemNumero) {
        return Casoerror(2)
    }

    Noterror(2);
}



function ValidarConfirmSenha() {
    if (inputs[2].value == inputs[3].value && inputs[3].value.length >= 8) {
        return Noterror(4)
    } else {
        Casoerror(4)
    }
}