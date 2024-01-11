console.log("File js carregada");

window.addEventListener("DOMContentLoaded", function () {
    function buscarDadosDaAPI(url) {  
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição à API: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error(`Erro ao buscar dados: ${error.message}`);
            });
    }
    
    const urlDaAPI = "https://api.cosmicjs.com/v3/buckets/collected-memories-production-19d268e0-ab2a-11ee-ba66-8b61b87e3752/objects/65a00b57aa609f4b521b3d47?read_key=KyYPncCMqJ14IQonFQdyh5yIKfZGRRDHqg93DHO0coRKHy1iLw&depth=1&props=slug,title,metadata,";
    
    buscarDadosDaAPI(urlDaAPI)
        .then(dadosRetornados => {
            if (dadosRetornados) {
                let dado = dadosRetornados.object.metadata;
                console.log(dado);  

            //Carregamento de elementos    
                let h1  = document.querySelector(".TextoAbout>h1");
                let h2  = document.querySelector(".TextoAbout>h2");
                let p   = document.querySelector(".TextoAbout>p");
                let img = document.querySelector(".ImagemAbout>img");

            //Atribuição de dados 
                h1.innerText = dadosRetornados.object.title;
                h2.innerText = dado.subtitle;
                p.innerText  = dado.conteudo;
                img.src      = dado.image_about.url;
            }
        });

});