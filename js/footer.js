console.log('heheh');
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
    
    let urlDaAPI = 'https://api.cosmicjs.com/v3/buckets/collected-memories-production-19d268e0-ab2a-11ee-ba66-8b61b87e3752/objects/65a1b360aa609f4b521b4283?read_key=KyYPncCMqJ14IQonFQdyh5yIKfZGRRDHqg93DHO0coRKHy1iLw&depth=1&props=slug,title,metadata,';
    console.log(urlDaAPI);
    
    buscarDadosDaAPI(urlDaAPI)
        .then(dadosRetornados => {
            if (dadosRetornados) {

               let dadosRetornados1 = dadosRetornados.object.metadata;         
                    changeContent(dadosRetornados1);
            }
        });
});

function changeContent(dados){
            let footerInfo = document.querySelector('.footerInfo');
            let footerInfoTexto = document.createElement('div');
            let footerInfoTexto2 = document.createElement('div');

            footerInfoTexto.setAttribute('class','footerInfoTexto');
            footerInfoTexto2.setAttribute('class','footerInfoTexto2');
            

            console.log(dados);

            //CONTACTS
            let footerContacts = document.createElement('div');
            footerContacts.setAttribute('class','footerContacts');

            let t1 = document.createElement('h3');
            t1.innerText = dados.c1title;
            footerContacts.appendChild(t1);

            let p1;
            let aux = Object.keys(dados.c1descre);

            for(let i=0; i<aux.length; i++){
                p1 = document.createElement('p');
                p1.innerText = dados.c1descre[aux[i]];
                footerContacts.appendChild(p1);
            }

            footerInfoTexto2.appendChild(footerContacts);

            //SUPORT
            let footerSuport = document.createElement('div');
            footerSuport.setAttribute('class','footerSuport');

            let t2 = document.createElement('h3');
            t2.innerText = dados.c2title;
            footerSuport.appendChild(t2);

            aux = Object.keys(dados.c2descre);

            for(let i=0; i<aux.length; i++){
                p1 = document.createElement('p');
                p1.innerText = dados.c2descre[aux[i]];
                footerSuport.appendChild(p1);
            }

            footerInfoTexto2.appendChild(footerSuport);

            //TEXTINHO
            let p3;
            let footerTextinho = document.createElement('div');
            footerTextinho.setAttribute('class','footerTextinho');

            aux = Object.keys(dados.c3descre);
            console.log(dados.c3descre[aux]);

            for(let i=0; i<aux.length; i++){
                p3 = document.createElement('p');
                p3.innerHTML = dados.c3descre[aux];
                console.log(p3);
                footerTextinho.appendChild(p3);
            }

            footerInfoTexto.appendChild(footerInfoTexto2);
            footerInfoTexto.appendChild(footerTextinho);

            footerInfo.appendChild(footerInfoTexto);
    }
