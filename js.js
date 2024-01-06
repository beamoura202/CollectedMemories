console.log("fui carregado");

var divGridItem;

window.addEventListener("DOMContentLoaded", function () {

    divGridItem = document.querySelectorAll('.grid-item');

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
    
    // Exemplo de uso:
    const urlDaAPI = "https://api.cosmicjs.com/v3/buckets/collected-memories-production-19d268e0-ab2a-11ee-ba66-8b61b87e3752/objects/65987df4723ffd2d238b5d07?read_key=KyYPncCMqJ14IQonFQdyh5yIKfZGRRDHqg93DHO0coRKHy1iLw&depth=1&props=slug,title,metadata,";
    
    buscarDadosDaAPI(urlDaAPI)
        .then(dadosRetornados => {
            if (dadosRetornados) {
                console.log(dadosRetornados);

                let dado = dadosRetornados.object.metadata.tudo.objects[8];

                //
                    let divRows = this.document.querySelectorAll('.grid-item');

                //DIVS
                    let divAllObj = document.createElement('div');
                    let divEfeitoPop = document.createElement('div');
                    let divTextPop = [];
                    let divCaneca = document.createElement('div');

                //IMG
                    let img = document.createElement('img');
                    //SVGS
                        let svgT = ['<svg viewBox="','"><path id="curve" d="M 0 120 C 0 120,130 0, 260 120"></path><text class="','" text-anchor="middle"><textPath class="text_path" href="#curve" startOffset="50%">','</textPath></text></svg>'];

                //AUXs
                    let aux = '';
                    let auxB = '';
                    let auxC = '';


                //CARREGAR IMG 
                   img.setAttribute('src', dado.metadata.image.url);
                   img.setAttribute('alt', dado.title);
                   divCaneca.setAttribute('class', 'caneca');
                   divCaneca.appendChild(img);

                //Carregar Efeito
                    divEfeitoPop.setAttribute('class', 'efeitoPOP');
                    divAllObj.setAttribute('class', 'allObj');

                //CARREGAR SVG
                   for(let i=0; i<2; i++){
                     let svg;
                     divTextPop[i] = document.createElement('div');

                        if(i==0){
                            aux = '0 0 260 225';
                            auxB = 'TextCurv';
                            auxC = dado.title;
                        }else{
                            aux = '0 0 260 200';
                            auxB = 'TextCurv2';
                            auxC = dado.subtitle;
                        }
                     
                     svg = svgT[0] + aux + svgT[1] + auxB + svgT[2] + auxC + svgT[3];
                     divTextPop[i].setAttribute('class','textoPOP');
                     divTextPop[i].innerHTML = svg;
                     divEfeitoPop.appendChild(divTextPop[i]);
                   }

                   divAllObj.appendChild(divEfeitoPop);
                   divAllObj.appendChild(divCaneca);

                   divRows[0].appendChild(divAllObj);
                //


                  
            }
        });

});

/*                    <div class="allObj">

                      <div class="efeitoPOP">
                        <img src="../img/efeito3.png"> 
                        <div class="textoPOP">
                          <svg viewBox="0 0 260 225">
                            <path id="curve" d="M 0 120 C 0 120,130 0, 260 120"></path>
                            <text class="TextCurv" text-anchor="middle">
                              <textPath class="text_path" href="#curve" startOffset="50%">Curved Text</textPath>
                            </text>
                          </svg>
                        </div>
                        <div class="textoPOP">
                          <svg viewBox="0 0 260 205">
                            <path id="curve" d="M 0 120 C 0 120,130 0, 260 120"></path>
                            <text class="TextCurv2" text-anchor="middle">
                              <textPath class="text_path" href="#curve" startOffset="50%">texto num2</textPath>
                            </text>
                          </svg>
                        </div> 
                      </div>


                        <div class="caneca">
                          <img src="../img/chavena3.png">
                        </div>
                    </div> */