import Toast from "../models/toast_model.js"
import { DoomUtilities } from "../models/doomUtilities_model.js"
import { UsuarioController } from "./usuarios_controller.js"

class Form {
    static form = DoomUtilities.qs('#card-formulario')

    static addicionarSubmit() {
        this.form.addEventListener('submit', this.receberDados)
    }

    static mostrarSenha(valor) {
        const senha = DoomUtilities.qs('#senha-formulario', this.form)
        if (valor) {
            senha.setAttribute('type', 'text')
        }
        else {
            senha.setAttribute('type', 'password')
        }
    }

    static negado(...valoresNegados) {
        let icon = true
        let type = 'warning'
        for (const valorNegado of valoresNegados) {
            if (valorNegado === 'local') {type = 'error'; icon = `./assets/images/icons/${type}.svg`}
            else if (valorNegado === 'local1') {icon = `./assets/images/icons/${type}.svg`}
            else if (valorNegado === 'local2') {type = 'error'}
            else new Toast(`${valorNegado}`, {type: type, showIcon: icon})
        }
    }

    static bemSucedido(local) {
        new Toast('Seu cadastro foi um sucesso! Em 5 segundos você vai ser redirecionado...', {type: 'sucess', onClose: () => {window.location = local}})
    }
}

export class LoginForm extends Form {    
    static receberDados(Event) {
        Event.preventDefault()

        const [email, senha, , , lembrar] = [...Event.currentTarget]

        const data = {
            email: email.value,
            password: senha.value
        }
        let negados = []
        negados.push('local1')
        for (const chave of Object.keys(data)) {
            if (!data[chave]) {
                negados.push(chave === 'password' ? 'Senha é um campo obrigatório!' : `Email é um campo obrigatório!`)
            }
        }
        if (negados.length > 1) {
            Form.negado(...negados)
        }
        else {
            UsuarioController.logarUsuario(data, lembrar.checked, Form)
        }
    }
}

export class CadastrarForm extends Form {
    static receberDados(Event) {
        Event.preventDefault()

        const [nome, masculino, feminino, email, fotoPerfil, senha] = [...Event.currentTarget]
        console.log(fotoPerfil.value)
        const avatar = fotoPerfil.value || (
            masculino.checked ? 'https://lh3.googleusercontent.com/iS9H1urdb9UoUU5BtEkp7ahKCUjPQOFBX-SF_xBUxzTvUEsQoUqR4R4ZXMnfU7Iei-WKq3-l9oVEBSOhdqSDy_Qj2CiPG2_M9RQjXj2Wf7sf9ZU9iM1ixzZfsMP1iyQBqbF0afBuPuSgFHIGVr1IOZmRJK2zYepUYcEy_c4Ov1N1iW1D1pWfhvQcJda3pqiekJ75mjzZaWVJzghJwzhhUG_7CtixXKf7_N01SzqceqnIViMeSIhIQ3I7nmSQODyKHWDmxwjUFtcrWUByefpdUtosflYqsxA706TFEQpVa-3Zbk61Td8Izje2T3UaoQddzQjt2TyQhRb2060P_iBLRQuLJ-tIWJgqhG8t6dpqT3nmgtYGK0fDFLi4pYxsKErBR4RBale0s37BFnLAxcuMTXi3llWcqrcWRb-nNE1wk-v1N9EKmCKZAF_yZkDYzyyN_y6IAyQWtGU9LRb6hNQObDudSRLYnLTfeNPaa-raHFLQzp7ygeqg2AhAHBX3M9aaHwVLVIi3c4ZwoxsRQ0wq5NAenHd8qEPq1e_-mtEG4R2ZbKpIUP6s0mt5oWRiE0Eso50I8AQtVqPvi32z9ptFGCHwQmfiPI0RcGMwFw05VPYO3sJmmn_eCvacUj70nJbUDydCtVJFgq_ngRxlb7cHgn-CyQbZNbAK-rCs98hNwRIaAI_QLK1JkvjvyFUyTSvqFIfPfjyrfm1oOPxjxCMEAILwNPDYLBBQPExVFZaF4QWYwrow0BSzh2kxvs8MuiPggdZ3RACQ3iPC44TOn6eRmkdMJaK3F1na=s96-no?pageId=102567711928718121889&authuser=0' :
            feminino.checked ? 'https://lh3.googleusercontent.com/NFyGbajD-n4cPc_QJ46Bnvgk3TUab7ooIjH1rHDtxjnH6MVXAt_LIrC_CIjsWB-EBBb8d2edaHNNdWeog5U8FdeWR7WeXcn5pCIbbNVQU70V6KrhlUygLgbGwzzfi2LFuGQDiB6jQocdD_cDig6G7HtLS15iOzmQM0XvvOltiNm40QqPGW9Yzn1faj1FQDXrMp9nbApLJ9qM8EqTalxWvq4g2QkHmpPq2TRPn4h7Gv8EiZi4NMAGSXCBwhb0CmSdf2AD5BFTBqZ-PFY85hIptZeIZzo6tMfyyfATbQS4TGoOMWnK_8aWTr5JhKbTPv6gALL3Uz6FJLTMODZUTQyZNHh0gRC-37pBBhI9xphOtPAxEmId1K6GgkKdbwD7bfmCj11alLX-IcxG9dm9IEaZc-T3wX8nr3fy_zrixGy68_4QSwQaumf5KIgOQOw7Gf2y4ct9u60iQbAB7mlSO-78hKYUWikzCw1VwwpWwaFLMC4beTCRf21WZSP9HKVGvh7bnBdBdwjlItGB1xZgkbLTN3Ri3EXaDLIEMXdrR90ZmXhcku8LiKFaMxqfpbhoPe_hI7tCc2qD0mkg5NWdfVxaDpu5Io6vLE_ByA_xuwfWn7gsuWOzCWMcDfP0SlJZx85d-Cf9ZXmb61ofNNH3ahDqsw10f7mjkEvfIsuv4us2quvqsR9QGiDHkXkWNlXG0LjMvFBrlT0UdOUQpszboMvWfIaqmFcUODdGlbNSzvDWzny56hE6U7JQDdg34uW2Uunk1aSCUNhLJo-UHH6IqH8_PoVEaVjkX4vr=s96-no?pageId=102567711928718121889&authuser=0' :
            '')

        const data = {
            username: nome.value,
            email: email.value,
            avatarUrl: avatar,
            password: senha.value
        }

        let negados = []
        let conversao = {
            username: 'Nome de usuario é obrigatório!',
            email: 'Email é obrigatório!',
            avatarUrl: 'Marque o seu sexo ou cole a url de uma imagem!',
            password: 'Senha é obrigatória!'
        }
        for (const chave of Object.keys(data)) {
            if (!data[chave]) negados.push(conversao[chave])
        }
        if (negados.length > 0) return Form.negado(...negados)
        else UsuarioController.cadastrarUsuario(data, Form)
    }
}
