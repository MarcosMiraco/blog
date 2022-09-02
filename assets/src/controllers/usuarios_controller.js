export class UsuarioController {
    static BASE_URL = 'https://api-blog-m2.herokuapp.com/user/'

    static async logarUsuario(data, lembrar, formulario) {
        const URL = `${this.BASE_URL}login`

        let mensagem = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.userId)
            localStorage.setItem('lembrar', lembrar)
            return data
        })

        if (mensagem.status === 'error') {

            formulario.negado('local', 'Senha ou email inválidos')
            return
        }

        const a = document.createElement("a")
        a.href = './assets/pages/home.html'
        a.click()
    }

    static async cadastrarUsuario(data, formulario) {
        const URL = `${this.BASE_URL}register`

        let resposta = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response)
        let mensagem = await resposta.json()
        if (mensagem.id) formulario.bemSucedido('../../index.html')
        else if (mensagem.message.includes('duplicate')) {formulario.negado('local2', 'Esse email já foi cadastrado!')}
    }

    static async listarUsuario() {
        const URL = `${this.BASE_URL}${localStorage.userId}`
        const usuario = await fetch(URL, {
            headers: {
                "Authorization": `Bearer ${localStorage.token}`
            }
        })
        .then(response => response.json())

        return usuario
    }

}
