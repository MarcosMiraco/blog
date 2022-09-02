import { Post } from "./post_model.js"

export class Usuario {
    constructor(nome, email, avatar, dataCriado, token, id) {
        this.nome = nome
        this.email = email
        this.avatar = avatar
        this.dataCriado = dataCriado
        this.token = token
        this.id = id
    }

    listarPostParginacao(pagina) {
        const botaoLogar = document.querySelector('#botao-logout')
        botaoLogar.addEventListener('click', () => {
            this.deslogar()
        })

        const botaoPostar = document.querySelector('#botao-postar')
        botaoPostar.addEventListener('click', () => {
            this.novoPost()
        })

        const novoPost = document.querySelector('#novoPost')
        novoPost.addEventListener('keydown', Event => {
            if (Event.key === 'Enter' && !Event.shiftKey) {
                Event.preventDefault()
                this.novoPost()
            }
        })


        Post.listarPostsPaginacao(this, pagina)
    }

    novoPost() {
        Post.novoPost(this)
    }

    deslogar() {
        localStorage.clear()
        const a = document.createElement('a')
        a.href = "../../index.html"
        a.click()
    }
}
