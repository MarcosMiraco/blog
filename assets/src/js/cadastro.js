import { CadastrarForm } from "../controllers/forms_controller.js";

CadastrarForm.addicionarSubmit()
const mostrarSenha = document.querySelector('#mostrarSenha')
mostrarSenha.addEventListener('click', () => {
    CadastrarForm.mostrarSenha(mostrarSenha.checked)
})