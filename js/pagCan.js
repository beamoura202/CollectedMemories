
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
    
    const urlDaAPI = "https://api.cosmicjs.com/v3/buckets/collected-memories-production-19d268e0-ab2a-11ee-ba66-8b61b87e3752/objects/65987df4723ffd2d238b5d07?read_key=KyYPncCMqJ14IQonFQdyh5yIKfZGRRDHqg93DHO0coRKHy1iLw&depth=1&props=slug,title,metadata,";
    
    buscarDadosDaAPI(urlDaAPI)
        .then(dadosRetornados => {
            if (dadosRetornados) {
               let urlData = getUrlVar();

               let dadosRetornados1 = dadosRetornados.object.metadata.tudo.objects;
               
               if(urlData.i!=undefined || urlData.i!=null){
                    let dado = dadosRetornados1.find((dad) => dad.i == urlData.i);
                     
                    changeContent(dado);
               }else{
                    console.error('empty Url');
               }
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

    p.innerText = dado.metadata.description;
    img.src = dado.metadata.image.url;

}