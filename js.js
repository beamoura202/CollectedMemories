window.addEventListener("DOMContentLoaded", function () {

    function buscarDadosDaAPI(url, parametros = {}) {
        // Construa a URL com os parâmetros, se houver
        const parametrosURL = new URLSearchParams(parametros);
        const urlCompleta = `${url}?${parametrosURL}`;
    
        // Faça a solicitação usando o fetch
        return fetch(urlCompleta)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição à API: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error(`Erro ao buscar dados da API: ${error.message}`);
            });
    }
    
    // Exemplo de uso:
    const urlDaAPI = "https://exemplo.com/api/dados";
    const parametrosDaAPI = { chave: "valor" };
    
    buscarDadosDaAPI(urlDaAPI, parametrosDaAPI)
        .then(dadosRetornados => {
            if (dadosRetornados) {
                console.log("Dados da API:");
                console.log(dadosRetornados);
            }
        });

});