const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const form = document.getElementById('form')
const inputs = [...document.querySelectorAll('.input')]
const required = [...document.querySelectorAll('.required')]