const urlPart = ['https://api.cosmicjs.com/v3/buckets/collected-memories-production-19d268e0-ab2a-11ee-ba66-8b61b87e3752/objects/','?read_key=KyYPncCMqJ14IQonFQdyh5yIKfZGRRDHqg93DHO0coRKHy1iLw&depth=1&props=slug,title,metadata,'];
let id = '';

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

    id = getUrlVar();
    
    let urlDaAPI = urlPart[0] + id.i + urlPart[1];
    console.log(urlDaAPI);
    
    buscarDadosDaAPI(urlDaAPI)
        .then(dadosRetornados => {
            if (dadosRetornados) {

               let dadosRetornados1 = dadosRetornados.object.metadata;         
                    changeContent(dadosRetornados1);
            }
        });
});

function getUrlVar(){
    var url = window.location.href;
    var queryString = url.split('?')[1];
    var params = {};
    var keyValuePairs = queryString.split('&');
 
        keyValuePairs.forEach(function(keyValue) {
            var pair = keyValue.split('=');
            var key = pair[0];
            var value = pair[1];
            params[key] = decodeURIComponent(value);
        });

   return params;
}

function changeContent(dado){
    let h2 = document.querySelector('.divTextoCanecas>h2');
    let p = document.querySelector('.divTextoCanecas>p');

    let img = document.querySelector('.fundopreto>img');
    let title = document.querySelector('.text_path');
    
    console.log(title);
    
    h2.innerText = dado.subtitle;
    title.innerHTML = dado.title;

    p.innerText = dado.story;
    img.src = dado.image.url;

}