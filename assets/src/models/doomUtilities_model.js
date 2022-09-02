export class DoomUtilities {
    /**
     * 
     * @param {String} seletor 
     * @param {document} parent 
     * @returns {HTMLElement}
     */
    static qs(seletor, parent = document) {
        return parent.querySelector(seletor)
    }
    
    /**
     * 
     * @param {String} seletor 
     * @param {document} parent 
     * @returns {HTMLElement}
     */
    static qsa(seletor, parent = document) {
        return [...parent.querySelectorAll(seletor)]
    }
    
    /**
     * 
     * @param {String} tipo 
     * @param {{}} opções 
     * @returns {HTMLElement}
     */
    static criarElemento(tipo, opções = {}) {
        const elemento = document.createElement(tipo)
    
        for (const [chave, valor] of Object.entries(opções)) {
            if (chave === 'text') {
                elemento.innerText = valor
            }
            else if (chave === 'data') {
                for (const [data, dataValor] of Object.entries(valor)) {
                    elemento.dataset[data] = dataValor
                }
            }
            else if (chave === 'class') {
                for (const classe of valor) {
                    elemento.classList.add(classe)
                }
            }
            else {
                elemento.setAttribute(chave, valor)
            }
        }
        
        return elemento
    }   
}