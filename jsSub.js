console.log("fui carregado");

var divGridItem;
var nItensR = 6;
var lastNItensR = 0;
var total = 0;
var lim = 24;

//
var rowsCarregadas = [];


//arrayBidimensionais
var itensCarregados = [];
var allItensCarregados = false;
var nItensPerRow = []; 
var itensPerColocar = 0;

//oragnização Prateleiras
var dispOriginal = [];
var dispMostrar = [];
var dispMostrar1 = [];

var dadosTodos = [];
var dadosFilter = [];
var dadosOrdenados = []; 

//Botoes
var botoesType = [];
var botoesDecade = [];
var botoesPage = [];
var searchBar;

var pagesUrl = [];

var hoverObjs = [];

var orderImages = [];

var maxBule = 250;
var maxCaneca = 175;
var maxXicara = 145;

let wJanela;
let hJanela;

const padding = 100;

//////PRE_LOAD
    var imageUrlOdd = '../PecasArmario/tudoJunto_01.svg';
    var imageUrlEven = '../PecasArmario/tudoJunto_02.svg';

    // Função para carregar as imagens antes de criar as divs
    function preloadImages() {
      var imageOdd = new Image();
      imageOdd.src = imageUrlOdd;

      imageOdd.onload = function () {
        var imageEven = new Image();
        imageEven.src = imageUrlEven;
      };
    }


///////MAIN EVENTS 
     //QUANDO CARREGADO 
        window.addEventListener("DOMContentLoaded", function () {

            preloadImages();

            searchBar = document.querySelector('#searchInput');
            searchBar.addEventListener('input', (e)=>{
               filter('search',e.target.value);
               reOrder('title','false');
               setInArmario();//set data no armario com os espacos
               displayArmario(nItensR);
               updateRows();
               loadRow();
            });

            divGridItem = document.querySelectorAll('.grid-item');

            //LOAD BOTOES
             botoesPage = document.querySelectorAll('.butoesdivmenuPages>button');
              console.log(botoesPage);

              botoesPage.forEach((bt)=>{bt.addEventListener('click',function(){
                    var urlAtual = window.location.href;
                    var novoUrl = urlAtual.replace("index.html", bt.value);
                    window.location.href = novoUrl;
                }
            )});

             botoesType = document.querySelectorAll('.butoesdivmenuFiltros>button');
              console.log(botoesType);
              botoesType.forEach((bt)=>{bt.addEventListener('click',function(){
                    console.log(bt.value);
                    filter('type',bt.value);
                    reOrder('title','false');
                    setInArmario();//set data no armario com os espacos
                    displayArmario(nItensR);
                    updateRows();
                    loadRow();
                  }
              )});

             botoesDecade = document.querySelectorAll('.butoesdivmenuFiltros2>button');
               console.log(botoesDecade);
               botoesDecade.forEach((bt)=>{bt.addEventListener('click',function(){
                
                filter('decade',bt.value);
                reOrder('title','false');
                setInArmario();//set data no armario com os espacos
                displayArmario(nItensR);
                updateRows();
                loadRow();

                console.log(bt.value);
              
              
              })});

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
            
            const urlDaAPI = "https://api.cosmicjs.com/v3/buckets/collected-memories-production-19d268e0-ab2a-11ee-ba66-8b61b87e3752/objects/65a016b4aa609f4b521b3d86?read_key=KyYPncCMqJ14IQonFQdyh5yIKfZGRRDHqg93DHO0coRKHy1iLw&depth=1&props=slug,title,metadata,";
            
            buscarDadosDaAPI(urlDaAPI)
                .then(dadosRetornados => {
                    if (dadosRetornados) {
                          //console.log(dadosRetornados);
                          allItensCarregados=false;
                          
                          total = Object.keys(dadosRetornados.object.metadata).length;

                            itensPerColocar = total; //numero maximo de itens na listagem
                            setArmario();

                          //colocar ids em objetos para fazer a correspondecia com as imagens
                          
                          let Dtotal = Object.entries(setDadosStrucutur(dadosRetornados.object.metadata)).map(([key, value]) => ({ key, value }));

                          //clone array
                          dadosTodos = [...Dtotal]; 
                          console.log(dadosRetornados);

                          dadosTodos.sort((a, b) => 0.5 - Math.random());
                          console.log(dadosTodos);

                          filter('type','teapot');
                          reOrder('title','false');
                          loadAllImage();


                          /*setArmario();//set armario com espacoas 
                          setInArmario();//set data no armario com os espacos
                          displayArmario(nItensR);

                          updateRows();
                          loadRow();*/
                      

                          /*hoverObjs.forEach(ele => {
                            console.log(ele.className);

                                ele.addEventListener('mouseover',function(){
                                  console.log('a');
                                  ele.classList.add('visible');                  
                                });

                                ele.addEventListener( 'mouseout',function(){
                                  console.log('b');
                                  ele.classList.remove('visible');                  
                                });
                          });*/
                    }
                });
        });

    //QUANDO A JANELA REDIMENSIONADA
        window.addEventListener('resize',function(){
          //Organização de itens pelas prateleiras 
          //updateRows();
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
          img.setAttribute('src', dado.value.image.url);
          img.setAttribute('alt', dado.title);

          img.onload = function() {
            //Where loaded 
            loadedImage(dado.value.i, this);
          };

          divCaneca.setAttribute('class', 'caneca');
          divCaneca.appendChild(img);

        //Carregar Efeito
            divEfeitoPop.setAttribute('class', 'efeitoPOP hoverPiece');
            divAllObj.onclick = function(){
              redirectPg(dado.value.i);
            }    


            divAllObj.className = 'allObj'; 
            img = document.createElement('img');
          
                let src = ' ';
                let idAt = i * nItensR + j;
                
                console.log(idAt);
                
                  if(idAt % 2 === 0){
                    src = '../img/efeito_1.png';
                  }
                  if(idAt % 3 === 0){
                    src = '../img/efeito_2.png';
                  }
                  if(src === ' '){
                    src = '../img/efeito_3.png';
                  }

            img.src = src;

            divEfeitoPop.appendChild(img);

        //CARREGAR SVG
          for(let i=0; i<2; i++){
            let svg;
            divTextPop[i] = document.createElement('div');

                if(i==0){
                    aux = '0 0 260 225';
                    auxB = 'TextCurv';
                    auxC = dado.value.title;
                }else{
                    aux = '0 0 260 200';
                    auxB = 'TextCurv2';
                    auxC = dado.value.subtitle;
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

      function loadRow(){
        itensCarregados = [];
        let gridContainer = document.querySelector('.grid-container'); 
        gridContainer.innerHTML = '';

        //grid item
        let rows = [];
        let aux2;
        let allMedidas=0;
        //string 
        let medidas;

        for(let i = 0; i<dispMostrar.length; i++){ 
            allMedidas=0;

            rows[i] = document.createElement('div');
            rows[i].setAttribute('class','grid-item');

            if (i % 2 === 0) {
              rows[i].style.backgroundImage = 'url("' + imageUrlEven + '")';
            } else {
              rows[i].style.backgroundImage = 'url("' + imageUrlOdd + '")';
            }

                for(let j = 0;  j<dispMostrar[i].length; j++){
                    if(dispMostrar[i][j].i!='-'){
                        aux2 = loadItem(dispMostrar[i][j],i,j);
                        itensCarregados.push({status:false, idd:dispMostrar[i][j].value.i, w:0, h:0});

                        //allMedidas+=verifyMedidas(dispMostrar[i][j].value.type);

                    }else{
                        aux2 = document.createElement('div');
                        aux2.setAttribute('class','allObj');

                    }
                      rows[i].appendChild(aux2);
                }

                if( i === dispMostrar.length-1 ){
                  for(let j = 0; j< nItensR - dispMostrar[i].length; j++){
                    aux2 = document.createElement('div');
                    aux2.setAttribute('class','allObj');
                    rows[i].appendChild(aux2);
                  }
                }

                rows[i].style.gridTemplateColumns = 

            gridContainer.appendChild(rows[i]);
        }
      }

      function loadAllImage(){
        orderImages = [];
        itensCarregados = [];

        for(let i = 0; i<dadosOrdenados.length ; i++){
           orderImages[i] = new Image();
           orderImages[i].src = dadosOrdenados[i].value.image.url;
           itensCarregados.push({status:false, idd:dadosOrdenados[i].value.i, w:0, h:0});
           orderImages[i].onload = ()=>{
             loadedImage(dadosOrdenados[i].value.i, dadosOrdenados[i].value.image.url);
           }
        }
      }
      
      function loadedImage(id , url){ //id-> id da peca
                //Se o id da imagem igual ao do array de carregamento
                //Load por id para que depois de ordenar as pecas as pecas se mantenham com o status certo  
                  let item = itensCarregados.find((ele) => ele.idd === id);
                  item.status = true;

                  let img = new Image();
                  img.src = url;

                  item.w = img.naturalWidth;
                    //console.log(item.w);
                  item.h = img.naturalHeight;
                    //console.log(item.h);
                   
                  loadAll1();  
      }

      function loadAll1(){
        let loaded = true; 
        
        for(let i = 0; i<itensCarregados.length; i++){
           if(itensCarregados[i].status == false){
              loaded=false;
              break;
           }
         }
  
         allItensCarregados = true;

         if(loaded == true){
           loadAll2();
         }
      }

      function loadAll2(){
         if(allItensCarregados){
           //setArmario();
         }else{
         }
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
                  dispOriginal.push('-');
                  esp++;
                }else{
                  dispOriginal.push('0');
                  itensPerColocar--;
                  cont++;
                }

              i++;
            }

            /*console.log(itensPerColocar);
            console.log(dispOriginal);
            console.log(cont);
            console.log(esp);*/
      }

      function displayArmario2(){
        let total = 0;
        let counter = 0;
        let totalS = 0;

         for(let i = 0; i < dadosOrdenados.length; i++){
             let dado = itensCarregados.find((ele) => ele.idd === dadosOrdenados.value.i); 
             let altura;

             if(dadosOrdenados[i].value.subtitle.toLowerCase() === 'teapot'){
                altura = maxBule;
             }else if(dadosOrdenados[i].value.subtitle.toLowerCase() === 'teacup'){
                altura = maxXicara;
             }else if(dadosOrdenados[i].value.subtitle.toLowerCase() === 'mug'){
                altura = maxCaneca;
             }

              let razao = dado.h/altura;
              let width = dado.w/razao; 
              total+=width;


         }
      }

      function setInArmario(){
        let arrayAux = [];
        let nCenas = lim;

        let calc = 0;

        let o = 0;

        while(o < dadosOrdenados.length){
          if(dispOriginal[calc] === '0'){
            o++;
          }
          calc++;
        }

        console.log(calc);
        
          nCenas = calc;

        o = 0;
        
        for(let a = 0; a<nCenas; a++ ){
            if(dispOriginal[a] === '-'){
              arrayAux.push({i:'-'});

            }else if(dispOriginal[a] === '0'){
              arrayAux.push(dadosOrdenados[o]);
              o++;
            }
        }

        console.log(arrayAux);
        dispMostrar1 = arrayAux;
      }



      function displayArmario(nI){
        dispMostrar = [];
        rowsCarregadas = [];

        for (var i = 0; i < dispMostrar1.length; i += nI) {
          dispMostrar.push(dispMostrar1.slice(i, i + nI));
        }
        
        //colunas carregadas para o display de está a ser carregado e para ajuste de dimensão dos artigos
        for(var i = 0; i <dispMostrar.length; i++){
          rowsCarregadas.push(false);
        }
      }


      function setData(){
        displayArrayMario = [];
        dispMostrar1 = []

            for(let i = 0; i = dispOriginal.length; i++){
                if(dispOriginal[i].i = '-'){
                  displayArrayMario.push(dispOriginal[i]); 
                }else{
                  displayArrayMario.push(dadosOrdenados[i]);
                }
            }

        dispMostrar1 = [...displayArrayMario];
      }



      function clear(){

      }

      /*function checkAllLoaded(){
        let loaded = true;

        console.log(itensCarregados); 

        //precorre todo o array se encontrar um elemento false acaba e devolve false
        for (var i = 0; i < itensCarregados.length; i++) {
              if(!itensCarregados[i].status){
                  loaded = false;
                  break;
              }
        }
        
        
        allItensCarregados = loaded;

        console.log(allItensCarregados);
      }*/

      function checkAllLoaded(){
        let loaded = true;

        console.log(itensCarregados); 
        console.log(dispMostrar);

        //precorre todo o array se encontrar um elemento false acaba e devolve false
        for (var i = 0; i <dispMostrar.length; i++) {
          loaded = true;  
          
          for(var j=0; j <dispMostrar[i].length; j++){
              //verifica que nao é um espaco em branco    
              if(dispMostrar[i][j].i!='-'){
                      let aux = itensCarregados.find((ele) => ele.idd == dispMostrar[i][j].value.i);
                         if(!aux.status){
                            loaded=false;    
                            break;
                         } 
                 }
          }
          rowsCarregadas[i] = loaded;
        }

        //setRowDimesions();
        
      }


      //elementos das rows sao carregados depois de ser dado o display nas colunas
      //colucar as devidas dimensoes aos elementos de uma row
      function setRowDimesions (){
            let arrayPerce = []; 
            let mediJuntas = 0;

         for(let i=0; i<rowsCarregadas.length; i++){
            arrayPerce = [];
            mediJuntas = 0;
            if(rowsCarregadas[i]){
              //get medidas Juntas
              for(let j = 0; j<dispMostrar[i].length; j++){
                if(dispMostrar[i][j].i!='-'){
                  let aux = itensCarregados.find((ele) => ele.idd == dispMostrar[i][j].value.i);
                  mediJuntas+=aux.w; 
                }else{
                  mediJuntas+=250;
                }
              }

              console.log(mediJuntas);

              for(let j = 0; j<dispMostrar[i].length; j++){
                if(dispMostrar[i][j].i!='-'){
                  let aux = itensCarregados.find((ele) => ele.idd == dispMostrar[i][j].value.i);
                  arrayPerce.push((aux.w*100)/mediJuntas);
                }else{
                  arrayPerce.push((250*100)/mediJuntas);
                }
              }

              console.log(arrayPerce);

              //get Percentagens

            }
         }
      }

      //ORDER AND FILTER ///////////////////////////////////////////////////////////////////////////////////////////////
          //ORDER
          function reOrder(orderElement, order){ //ELEMENTO A ORDENAR-> decade;title;type /ORDENAÇÂO->false;true ASC;DESC
            let arrayOrder = [];
            //ORDER /ORDER BY ID NAME KINGDOM 

            //TODO: ALterar o array dataFilt para dadosTodos
  
                  if(dadosTodos!=null && dadosTodos.length>0){
                    if(orderElement!=undefined && order!=undefined && order!=null && orderElement!=null){

                          console.log(orderElement, order);

                          if(orderElement === 'decade'){ //ORDENAR 
                            if(order === 'false'){ //ASC
                              //Copiar o array e atribuição
                              arrayOrder = [...dadosFilter].sort((a, b) => a.value.decade - b.value.decade);
                            }else if(order === 'true'){ //DESC
                              //Copiar o array e atribuição
                              arrayOrder = [...dadosFilter].sort((a, b) => b.value.decade - a.value.decade);
                            }
              
                          }else if(orderElement == 'title'){ //ORDENAR TITLE
                            if(order === 'true'){ //ASC
                              //Copiar o array e atribuição
                              arrayOrder = [...dadosFilter].sort((a, b) =>
                                a.value.title > b.value.title ? 1 : -1,
                              );
                            }else if(order === 'false'){ //DESC
                              //Copiar o array e atribuição
                              arrayOrder = [...dadosFilter].sort((a, b) =>
                              a.value.title > b.value.title ? -1 : 1,
                            );
                            }
              
                          }else if(orderElement === 'type'){ //ORDENAR TYPE
                            if(order === 'true'){ //ASC
                              console.log('aaaab');
                              //Copiar o array e atribuição
                              arrayOrder = [...dadosFilter].sort((a, b) =>
                                a.value.type > b.value.type ? 1 : -1,
                              );
                            }else if(order === 'false'){ //DESC
                              //Copiar o array e atribuição
                              arrayOrder = [...dadosFilter].sort((a, b) =>
                              a.value.type > b.value.type ? -1 : 1,
                            );
                            }
                          }else{
                             arrayOrder = [...dadosFilter];
                          }


                          dadosOrdenados=[...arrayOrder];

                          console.log(dadosOrdenados);

                        }else{
                          console.error('orderElement or order with null or undifined values ://');
                        }

                }else{
                  console.error('Data not loaded prop. :/');
                }
              }


          //FILTER 
          function filter(filterBy,value){
            if(dadosTodos!=null && dadosTodos.length>0){
              if(filterBy!='' && filterBy!=null && filterBy!=undefined){

                //Verificação de segundo nivel para o caso de alteração de valores no html
                let filter = filterBy.toLowerCase();
                let valueB = value.toLowerCase();
                let dataFiltrada = [];

                //FILTER TYPE
                    if(filter === 'type'){//alterar para um array e um find 
                      dataFiltrada = [...dadosTodos].filter( dado => dado.value.subtitle.toLowerCase() === valueB);

                //FILTER DECADE
                    }else if(filter === 'decade'){ //alterar para um array e um find 
                      dataFiltrada = [...dadosTodos].filter( dado => dado.value.decade.toLowerCase() === valueB);

                //NO FILTER
                    }else{
                      dataFiltrada = [...dadosTodos];
                      console.error('NOT URGENT: unrec filter'); 
                    }

                    if(filter === 'search'){
                        const padrao = new RegExp(valueB, 'i');
                        dataFiltrada = [...dadosTodos].filter(dado => padrao.test(dado.value.title.toLowerCase()));
                    }

                    dadosFilter = dataFiltrada;
                    console.log(dadosFilter);

              }else{
                console.error('empty filterBy or null value ://');
              }

              console.log();

            }else{
              console.error('Data not loaded prop. :/');
            }
          }

      function setDadosStrucutur(dadosExt){
        const chaves = Object.keys(dadosExt);
        let aux = dadosExt;

        console.log(chaves.length);
         
        for(let a = 0; a<chaves.length; a++){
          aux[chaves[a]].i=a;
          console.log(aux[chaves[a]].i);
        }

        return aux;
      }    


      ///OUTRAS  ///////////////////////////////////////////////////////////////////////////////////////////
      function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

      function redirectPg(id){
          var urlAtual = window.location.href;
          var novoUrl = urlAtual.replace("index.html", "PaginaCanecaBase.html");
          window.location.href = novoUrl + "?i=" + id;
      }

      function updateRows(){
        if(window.innerWidth<=720){
          nItensR = 2;
        }else if(window.innerWidth>720 && window.innerWidth<1000){
          nItensR = 4;
        }else if(window.innerWidth<1000){
          nItensR = 6;
        }else{
          nItensR = 6;
        }

        if(nItensR !== lastNItensR){
          displayArmario(nItensR);
          loadRow();
        }

        lastNItensR = nItensR;
      }