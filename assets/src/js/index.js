import { LoginForm } from "../controllers/forms_controller.js"

function verificarLembrar() {
    if (localStorage.lembrar === 'true') {
        const a = document.createElement('a')
        a.href = './assets/pages/home.html'
        a.click()
    }
    else {
        localStorage.clear()
        
        LoginForm.addicionarSubmit()
        const mostrarSenha = document.querySelector('#mostrarSenha')
        mostrarSenha.addEventListener('click', () => {
            LoginForm.mostrarSenha(mostrarSenha.checked)
        })
    }
   
}

verificarLembrar()