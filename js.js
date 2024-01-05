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
    const urlDaAPI = "https://api.cosmicjs.com/v3/buckets/collected-memories-production-19d268e0-ab2a-11ee-ba66-8b61b87e3752/objects/65987df4723ffd2d238b5d07?read_key=KyYPncCMqJ14IQonFQdyh5yIKfZGRRDHqg93DHO0coRKHy1iLw&depth=1&props=slug,title,metadata,";
    const parametrosDaAPI = { chave: "valor" };
    
    buscarDadosDaAPI(urlDaAPI, parametrosDaAPI)
        .then(dadosRetornados => {
            if (dadosRetornados) {
                console.log("Dados da API:");
                console.log(dadosRetornados);
            }
        });

});