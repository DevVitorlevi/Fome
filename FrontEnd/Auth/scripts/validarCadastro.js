const Form =  document.getElementById('form-cadastro')
const Inputs = [...document.querySelectorAll('.input')]
const Required = [...document.querySelectorAll('.required')]
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const mostrarSenha = document.querySelector('.bi-eye')

Form.addEventListener('submit', impedirEnvio)
Inputs[0].addEventListener('input', validarNome)
Inputs[1].addEventListener('input', validarEmail)
Inputs[2].addEventListener('input', validarSenha)

function impedirEnvio(e){
    e.preventDefault()
    validarNome()
    validarEmail()
    validarSenha()
}

document.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        impedirEnvio()
    }
})

function error(i){
    Inputs[i].style.border = '2px solid red'
    Required[i].style.display = 'block'
}

function notError(i){
    Inputs[i].style.border = ''
    Required[i].style.display = 'none'
}

function validarNome(){
    if(Inputs[0].value.trim().length < 3){
        return error(0)
    }
    return notError(0)
}

function validarEmail(){
    if(emailRegex.test(Inputs[1].value)){
        return notError(1)
    }
    return error(1)
}

function validarSenha(){
    if(Inputs[2].value.length < 8 ){
        return error(2)
    }
    return notError(2)
}