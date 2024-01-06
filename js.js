console.log("fui carregado");

var divGridItem;
var nItensR = 6;
var total = 0;

//arrayBidimensionais
var itensCarregados = [];
var allItensCarregados = [];
var nItensPerRow = []; 
var itensPerColocar = 0;

//oragnização Prateleiras
var dispOriginal = [];
var dispMostrar = [];

var dadosTodos = [];

///////MAIN EVENTS 
     //QUANDO CARREGADO 
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
                          //console.log(dadosRetornados);
                          allItensCarregados=0;
                          
                          total = dadosRetornados.object.metadata.tudo.total;
                          itensPerColocar = total;

                          //clone array
                          dadosTodos = [...dadosRetornados.object.metadata.tudo.objects]; 
                          console.log(dadosRetornados);

                          dadosTodos.sort((a, b) => 0.5 - Math.random());
                          console.log(dadosTodos);

                          setArmario();
                          displayArmario(nItensR);

                          loadRow(dadosRetornados);

                          let gridItem = document.createElement('div');
                          gridItem.setAttribute('class','grid-item');                
                    }
                });
        });

    //QUANDO A JANELA REDIMENSIONADA
        window.addEventListener('resize',function(){
          //Organização de itens pelas prateleiras 
          if(window.innerWidth<=720){
            displayArmario(3);
          }else if(window.innerWidth>720){
            displayArmario(6);
          }else{
            displayArmario(6);
          }
        });


//////////FUNCTIONS
      function loadItem(dado,i,j){ //dado + row/i + item/j

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

          /*img.onload = function() {
            loadedImage(i,j);
          };*/

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

          return divAllObj;
      }

      function loadRow(dados){
        let gridContainer = document.querySelector('.grid-container'); 
        //grid item
        let rows = [];
        let aux2;

        for(let i = 0; i<dispMostrar.length; i++){ 
          rows[i] = document.createElement('div');
          rows[i].setAttribute('class','grid-item');

          for(let j = 0;  j<dispMostrar[i].length; j++){
           if(dispMostrar[i][j].i!='-'){
               aux2 = loadItem(dispMostrar[i][j]);
           }else{
               aux2 = document.createElement('div');
               aux2.setAttribute('class','allObj');
           }

           rows[i].appendChild(aux2);
          }
          gridContainer.appendChild(rows[i]);
        }
      }
      
      function loadedImage(i,j){ //i -> numero da row; j-> numero do elemento 
        //Se o id da imagem igual ao do array de carregamento 
                itensCarregados[i][j].status=true;
                //precorre os elementos
                checkAllLoaded();
                //allItensCarregados[i]++;
      }

      function setArmario(){
          //while
          let i = 0;
          let cont = 0;
          let esp = 0;

          console.log(itensPerColocar);
            while(itensPerColocar !== 0){

                if(itensPerColocar === 0){
                  break; 
                }else if(getRandomInt(10)>=9){
                  dispOriginal.push({i:'-'});
                  esp++;
                }else{
                  dispOriginal.push(dadosTodos[cont]);
                  itensPerColocar--;
                  cont++;
                }

              i++;
            }

            console.log(itensPerColocar);
            console.log(dispOriginal);
            console.log(cont);
            console.log(esp);
      }



      function displayArmario(nI){
        dispMostrar=[];

        for (var i = 0; i < dispOriginal.length; i += nI) {
          dispMostrar.push(dispOriginal.slice(i, i + nI));
        }
        console.log(dispMostrar);
      }



      function clear(){

      }

      function checkAllLoaded(){
        let loaded = true;

        //precorre todo o array se encontrar um elemento false acaba e devolve false
        for (var i = 0; i < itensCarregados.length; i++) {
          if(loaded){
              for (var j = 0; j < itensCarregados[i].length; j++) {
                  if(!itensCarregados[i][j].status){
                      loaded = false; 
                      break;
                  }
              }
          }else{
            break;
          }
        }
        
        allItensCarregados = loaded;
      }


      ///OUTRAS 
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }