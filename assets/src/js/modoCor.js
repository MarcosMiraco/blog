const cores = {
    claro: {
        "---cor-fundo": "#F3F3F3",
        "---cor-texto-padrao-1": "white",
        "---cor-blogs": "white",
        "---cor-faixa": "#6495ED",
        "---cor-botao-padrao": "#EDBC64",
        "---cor-botao-padrao-escuro": "#b18230",
        "---cor-nome-usuario": "rgba(0, 0, 0, 0.795)",
        "---cor-conteudo": "#5F5C5",
        "---cor-sombras": "rgb(156, 156, 156)",
        "---cor-complemento-imagem": "#424242",
        "---cor-modo-cores-texto": "white",
        "---cor-modo-cores-imagem": "#424242",
        "---cor-foco": "black"
    },
    escuro: {
        "---cor-fundo": "#17191b",
        "---cor-texto-padrao-1": "rgba(255, 255, 255, 0.897)",
        "---cor-blogs": "rgb(42, 43, 56)",
        "---cor-faixa": "rgb(30, 30, 59)",
        "---cor-botao-padrao": "#44753a",
        "---cor-botao-padrao-escuro": "#1f4119",
        "---cor-nome-usuario": "rgba(206, 206, 206, 0.842)",
        "---cor-conteudo": "#cccccce1",
        "---cor-sombras": "rgb(51, 51, 51)",
        "---cor-modo-cores-texto": "black",
        "---cor-modo-cores-imagem": "#dddddd",
        "---cor-foco": "#F3F3F3"
    }
}
const botaoModoCor = document.querySelector('#botao-modo-cores')
const iconeModoCor = document.querySelector('.modo-cores-icon')
const botaoModoCorTexto = document.querySelector('#botao-modo-claro-escuro-texto')
botaoModoCor.addEventListener('click', () => {
    let modo = botaoModoCor.dataset.modo
    let root = document.querySelector(':root')
    for (const [chave, valor] of Object.entries(cores[modo])) {
        root.style.setProperty(chave, valor)
    }
    botaoModoCor.dataset.modo = modo === 'escuro' ? 'claro' : 'escuro'
    iconeModoCor.src = modo === 'escuro' ? '../images/icon/sol.png' : '../images/icon/lua.png'
    modo = botaoModoCor.dataset.modo
    botaoModoCorTexto.innerText = `Modo ${modo[0].toUpperCase()}${modo.slice(1)}`
})