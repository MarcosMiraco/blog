import { DoomUtilities } from './doomUtilities_model.js';
import Toast from './toast_model.js';

export class Post {
    static BASE_URL = "https://api-blog-m2.herokuapp.com/post"
    static listaPosts = DoomUtilities.qs('#lista-posts')
    static listaPaginas = DoomUtilities.qs('#lista-paginas')

    static async listarPostsPaginacao(usuario, pagina) {
        const headerImg = DoomUtilities.qs('#header-img')
        const headerText = DoomUtilities.qs('#header-nomeUsuario')
        this.listaPosts.innerHTML = ''
        this.listaPaginas.innerHTML = ''

        headerImg.src = usuario.avatar
        headerText.innerText = usuario.nome
        const posts = await fetch(`https://api-blog-m2.herokuapp.com/post?${pagina}`, {
                        headers: {
                            "Authorization": `Bearer ${usuario.token}`
                        }
                    })
                    .then(response => response.json())
        
        localStorage.paginaAtual = Number(pagina.slice(pagina.indexOf('=') + 1))
        for (const post of posts.data) {
            this.postTemplate(post, usuario)
        }

        let inicio = 1
        if (Number(localStorage.paginaAtual) > 5) {
            inicio = Number(localStorage.paginaAtual) - 5
            const item = DoomUtilities.criarElemento('li')
            const button = DoomUtilities.criarElemento('button')
            button.classList.add('botao-padrao')
            button.id = 'botao-voltar'
            button.addEventListener('click', () => {
                Post.listarPostsPaginacao(usuario, `page=${Number(localStorage.paginaAtual) - 5}`)
            })
            item.appendChild(button)
            this.listaPaginas.appendChild(item)

            const itemc = DoomUtilities.criarElemento('li')
            const buttonc = DoomUtilities.criarElemento('button')
            buttonc.classList.add('botao-padrao')
            buttonc.id = 'botao-voltar-1'
            buttonc.addEventListener('click', () => {
                Post.listarPostsPaginacao(usuario, `page=${Number(localStorage.paginaAtual) - 1}`)
            })
            itemc.appendChild(buttonc)
            this.listaPaginas.appendChild(itemc)
        }
        else if (Number(localStorage.paginaAtual >= 2)) {
            const itemc = DoomUtilities.criarElemento('li')
            const buttonc = DoomUtilities.criarElemento('button')
            buttonc.classList.add('botao-padrao')
            buttonc.id = 'botao-voltar-1'
            buttonc.addEventListener('click', () => {
                Post.listarPostsPaginacao(usuario, `page=${Number(localStorage.paginaAtual) - 1}`)
            })
            itemc.appendChild(buttonc)
            this.listaPaginas.appendChild(itemc)
        }

        for (let number = inicio; number < posts.lastPage; number++) {
            if (Number(localStorage.paginaAtual) > 6) {
                if (number == Number(localStorage.paginaAtual) + 5) {
                    if (number <= posts.lastPage - 5) {
                        const itemc = DoomUtilities.criarElemento('li')
                        const buttonc = DoomUtilities.criarElemento('button')
                        buttonc.classList.add('botao-padrao')
                        buttonc.id = 'botao-avancar-1'
                        buttonc.addEventListener('click', () => {
                            Post.listarPostsPaginacao(usuario, `page=${Number(localStorage.paginaAtual) + 1}`)
                        })
                        itemc.appendChild(buttonc)
                        this.listaPaginas.appendChild(itemc)

                        const item = DoomUtilities.criarElemento('li')
                        const button = DoomUtilities.criarElemento('button')
                        button.classList.add('botao-padrao')
                        button.id = 'botao-avancar'
                        button.addEventListener('click', () => {
                            Post.listarPostsPaginacao(usuario, `page=${Number(localStorage.paginaAtual) + 5}`)
                        })
                        item.appendChild(button)
                        this.listaPaginas.appendChild(item)        
                    }
                    break
                }
            }
            else if (number === 12) {
                if (number <= posts.lastPage - 5) {
                    const itemc = DoomUtilities.criarElemento('li')
                    const buttonc = DoomUtilities.criarElemento('button')
                    buttonc.classList.add('botao-padrao')
                    buttonc.id = 'botao-avancar-1'
                    buttonc.addEventListener('click', () => {
                        Post.listarPostsPaginacao(usuario, `page=${Number(localStorage.paginaAtual) + 1}`)
                    })
                    itemc.appendChild(buttonc)
                    this.listaPaginas.appendChild(itemc)

                    const item = DoomUtilities.criarElemento('li')
                    const button = DoomUtilities.criarElemento('button')
                    button.classList.add('botao-padrao')
                    button.id = 'botao-avancar'
                    button.addEventListener('click', () => {
                        Post.listarPostsPaginacao(usuario, `page=${Number(localStorage.paginaAtual) + 5}`)
                    })
                item.appendChild(button)
                    this.listaPaginas.appendChild(item)        
                }
                break
            }

            const item = DoomUtilities.criarElemento('li')
            const button = DoomUtilities.criarElemento('button', {
                text: number
            })

            if (number === Number(localStorage.paginaAtual)) {
                button.classList.add('botao-padrao')
                button.id = 'pagina-atual'
            }
            else {
                button.classList.add('botao-padrao')
                button.addEventListener('click', () => {
                    Post.listarPostsPaginacao(usuario, `page=${number}`)
                })
            }

            item.appendChild(button)
            this.listaPaginas.appendChild(item)
        }

    }

    static async novoPost(usuario) {
        const novoPost = DoomUtilities.qs('#novoPost')
        const data = {
            "content": novoPost.value
        }
        novoPost.value = ''

        let resposta = await fetch(this.BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${usuario.token}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => response)
        console.log(resposta)
        this.postTemplate(resposta, usuario, true)
    }

    static postTemplate(post, usuario, antes=false) {
        const item = DoomUtilities.criarElemento('li')

        const conteiner = DoomUtilities.criarElemento('div', {
            id: 'lista-post--conteiner'
        })
        conteiner.addEventListener('click', this.criarModalPostCompleto)
        conteiner.post = post
        const divisao0 = DoomUtilities.criarElemento('div', {
            class: ['lista-post--conteiner---div0']
        })
        const divisao1 = DoomUtilities.criarElemento('div', {
            class: ['lista-post--conteiner---div1']
        })
        const divisao2 = DoomUtilities.criarElemento('div', {
            class: ['lista-post--conteiner---div2']
        })
        const titulo = DoomUtilities.criarElemento('h2', {
            text: post.owner.username
        })
        const conteudo = DoomUtilities.criarElemento('textarea', {
            text: post.post.length > 250 ? post.post.slice(0, 250) + '...' : post.post,
            readonly: true,
            rows: "7",
            class: ['conteiner-conteudo']
        })
        if (post.updatedAt) {
            divisao1.classList.add('conteudo-editado')
        }
        const figure = DoomUtilities.criarElemento('figure')
        const image = DoomUtilities.criarElemento('img', {
            src: post.owner.avatarUrl
        })

        if (post.owner.id === usuario.id) {
            const botaoEditar = DoomUtilities.criarElemento('button', {
                text: 'Editar',
                class: ['botao-padrao'],
                id: 'botao-editar'
            })
            botaoEditar.addEventListener('click', Event => {
                Event.stopImmediatePropagation()
                Post.editarPost(post.id, usuario, conteudo)
            })
            const botaoApagar = DoomUtilities.criarElemento('button', {
                text: 'Apagar',
                class: ['botao-padrao'],
                id: 'botao-apagar'
            })
            botaoApagar.addEventListener('click', Event => {
                Event.stopImmediatePropagation()
                Post.apagarPost(post.id, usuario, item)
            })
            divisao2.append(botaoEditar, botaoApagar)
        }

        const dataPublicacao = DoomUtilities.criarElemento('span', {
            text: post.createdAt,
            class: ['conteiner--div2---data']
        })

        figure.appendChild(image)
        divisao0.appendChild(figure)
        divisao1.append(titulo, conteudo)
        divisao2.append(dataPublicacao)
        conteiner.append(divisao0, divisao1, divisao2)
        item.append(conteiner)
        if (antes) {
            this.listaPosts.insertBefore(item, this.listaPosts.firstChild)
        }
        else {
            this.listaPosts.append(item)
        }
    }

    static editarPost(idPost, usuario, areaTexto) {
        let containerAvo = areaTexto.parentElement.parentElement
        containerAvo.removeEventListener('click', this.criarModalPostCompleto)

        areaTexto.removeAttribute('readonly')
        areaTexto.id = 'conteiner-conteudoEditavel'
        areaTexto.focus()

        let container = areaTexto.parentElement
        const botaoCancelar = DoomUtilities.criarElemento('button', {
            text: 'Cancelar',
            id: 'botao-cancelar',
            class: ['botao-padrao']
        })
        botaoCancelar.addEventListener('click', () => {
            areaTexto.id = ''
            areaTexto.setAttribute('readonly', 'true')
            container.removeChild(botaoCancelar)
            container.removeChild(botaoSalvar)
        })
        const botaoSalvar = DoomUtilities.criarElemento('button', {
            text: 'Salvar Alterações',
            id: 'botao-salvar',
            class: ['botao-padrao']
        })
        botaoSalvar.addEventListener('click', async () => {
            let URL = `${this.BASE_URL}/${idPost}`
            areaTexto.id = ''
            areaTexto.setAttribute('readonly', 'true')
            container.removeChild(botaoCancelar)
            container.removeChild(botaoSalvar)
            let mensagem = await fetch(URL, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${usuario.token}`
                },
                body: JSON.stringify({
                    "newContent": areaTexto.value
                })
            })
            .then(response => response)
            if (mensagem.status === 200) {
                new Toast('Texto editado com sucesso!', {type: 'sucess'})
                areaTexto.classList.add('conteudo-editado')
            }
        })
        container.append(botaoCancelar, botaoSalvar)
        areaTexto.addEventListener('keydown', async Event => {        
            if (Event.key === 'Enter' && !Event.shiftKey) {
                Event.preventDefault()
                let URL = `${this.BASE_URL}/${idPost}`
                Event.currentTarget.id = ''
                Event.currentTarget.setAttribute('readonly', 'true')
                container.removeChild(botaoCancelar)
                container.removeChild(botaoSalvar)
                let mensagem = await fetch(URL, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${usuario.token}`
                    },
                    body: JSON.stringify({
                        "newContent": Event.currentTarget.value
                    })
                })
                .then(response => response)
                if (mensagem.status == 200) {
                    new Toast('Texto editado com sucesso!', {type: 'sucess'})
                    areaTexto.parentElement.classList.add('conteudo-editado')
                }    
            }
        })
    }

    static async apagarPost(idPost, usuario, post) {
        const [modal, modalBotaoSim, modalBotaoNao] = this.criarModalApagarPost()

        modal.addEventListener('cancel', Event => {
            Event.preventDefault()
            modal.classList.add('removerModal') 
            modal.addEventListener('animationend', () => {
                modal.close()
                document.body.removeChild(modal)
            })
        })
        modalBotaoNao.addEventListener('click', () => {
            modal.classList.add('removerModal') 
            modal.addEventListener('animationend', () => {
                modal.close()
                document.body.removeChild(modal)
            })
        })
        modalBotaoSim.addEventListener('click', () => {
            modal.classList.add('removerModal') 
            modal.addEventListener('animationend', async () => {
                modal.close()
                document.body.removeChild(modal)

                let URL = `${this.BASE_URL}/${idPost}`
                let mensagem = await fetch(URL, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${usuario.token}`
                    }
                })
                if (mensagem.status === 204) {
                    new Toast('Post excluido com sucesso!', {type: 'sucess'})
                }
    
                this.listaPosts.removeChild(post)
                document.body.removeChild(modal)
            })
        })
        modal.showModal()
        modal.classList.add('aparecerModal') 
        modal.addEventListener('animationend', () => {
            modal.classList.remove('aparecerModal') 
        })
    }

    static criarModalApagarPost() {
        const modal = DoomUtilities.criarElemento('dialog', {
          id: 'modal'
        })
        const div0 = DoomUtilities.criarElemento('div', {
          id: 'modal-container'
        })
        const div1 = DoomUtilities.criarElemento('div', {
            id: 'modal-question-container'
        })
        const div2 = DoomUtilities.criarElemento('div', {
            id: 'modal-botoes-container'
        })
        const pergunta = DoomUtilities.criarElemento('span', {
            text: 'Você quer mesmo apagar o post?'
        })
        const butaoSim = DoomUtilities.criarElemento('button', {
            id: 'modal-botao-sim',
            text: 'sim'
        })
        const butaoNao = DoomUtilities.criarElemento('button', {
            id: 'modal-botao-nao',
            text: 'não'
        })

        document.body.appendChild(modal)
        modal.appendChild(div0)
        div0.append(div1, div2)
        div1.appendChild(pergunta)
        div2.append(butaoSim, butaoNao)

        return [modal, butaoSim, butaoNao]
    }

    static criarModalPostCompleto(Event) {
        let post = Event.currentTarget.post

        const modal = DoomUtilities.criarElemento('dialog', {
          id: 'modal-post'
        })
        document.body.addEventListener('keydown', function modalFechar(Event) {
            if (Event.key === 'Escape') {
                modal.classList.add('removerModal')
                div.classList.add('desaparecer')
                modal.addEventListener('animationend', () => {
                    modal.removeAttribute('open')
                    div.classList.remove('backdrop')
                    document.body.removeChild(div)
                    document.body.removeChild(modal)
                })
            }
        })
        const div = DoomUtilities.criarElemento('div', {
            id: 'container-modal'
          })  
        const div0 = DoomUtilities.criarElemento('div', {
          id: 'modal-container'
        })
        const div1 = DoomUtilities.criarElemento('div', {
            id: 'modal-user-container'
        })
        const div2 = DoomUtilities.criarElemento('div', {
            id: 'modal-content-container'
        })
        const div3 = DoomUtilities.criarElemento('div', {
            id: 'modal-botao-fechar-container'
        })
        const titulo = DoomUtilities.criarElemento('h2', {
            text: post.owner.username
        })
        const conteudo = DoomUtilities.criarElemento('p', {
            text: post.post,
            class: ['conteiner-conteudo-completo']
        })

        const figure = DoomUtilities.criarElemento('figure')
        const image = DoomUtilities.criarElemento('img', {
            src: post.owner.avatarUrl
        })
        const butaoFechar = DoomUtilities.criarElemento('button', {
            id: 'modal-botao-fechar',
            text: 'fechar',
            class: ['botao-padrao']
        })
        butaoFechar.addEventListener('click', () => {
            modal.classList.add('removerModal')
            div.classList.add('desaparecer')
            modal.addEventListener('animationend', () => {
                modal.removeAttribute('open')
                div.classList.remove('backdrop')
                document.body.removeChild(div)
                document.body.removeChild(modal)
            })
        })
        const dataPublicacao = DoomUtilities.criarElemento('span', {
            text: post.createdAt,
            class: ['conteiner--div2---data']
        })
        if (post.updatedAt) {
            const dataEdticao = DoomUtilities.criarElemento('span', {
                text: post.updatedAt,
                class: ['conteiner--div2---data']
            })
            dataEdticao.classList.add('modal-conteudo-editado')
            div1.appendChild(dataEdticao)
        }
        document.body.append(div, modal)
        modal.appendChild(div0)
        figure.appendChild(image)
        div0.append(div1, div2, div3)
        div1.append(titulo, figure, dataPublicacao)
        div2.appendChild(conteudo)
        div3.appendChild(butaoFechar)

        modal.show()
        modal.classList.add('aparecerModal') 
        div.classList.add('backdrop')
        div.classList.add('aparecer')
        modal.addEventListener('animationend', () => {
            modal.classList.remove('aparecerModal') 
            div.classList.remove('aparecer')
        })
    }
}
