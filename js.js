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
var allItensCarregados = [];
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

var filterOp = ['','',''];

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

               filterOp[2] = e.target.value;

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
                    
                    for(let i=0; i<botoesType.length; i++){
                      if(!bt.classList.contains('dark') && bt===botoesType[i]){
                        bt.classList.toggle('dark');

                        filterOp[0] = '';
                        if(bt.classList.contains('dark')){
                            filterOp[0] = bt.value;         
                        }
                        console.log(filterOp[0]);
                      }else{
                        if(botoesType[i].classList.contains('dark')){
                          botoesType[i].classList.remove('dark');
                        }
                      }
                    }

                    console.log(bt.value);
                    filter();
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

                for(let i=0; i<botoesDecade.length; i++){
                  if(!bt.classList.contains('dark') && bt===botoesDecade[i]){
                    bt.classList.toggle('dark');
                    if(bt.classList.contains('dark')){
                      filterOp[1] = bt.value;
                    }else{
                      filterOp[1] = '';
                    }
                  }else{
                    if(botoesDecade[i].classList.contains('dark')){
                      botoesDecade[i].classList.remove('dark');
                    }
                  }
                }

                filter();
                reOrder('title','false');
                setInArmario();//set data no armario com os espacos
                displayArmario(nItensR);
                updateRows();
                loadRow();
              
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
                          allItensCarregados=[];
                          
                          total = Object.keys(dadosRetornados.object.metadata).length;


                          if(lim<=total){
                            itensPerColocar = total; //numero maximo de itens na listagem
                          }else{
                            itensPerColocar = lim;
                          }

                          //colocar ids em objetos para fazer a correspondecia com as imagens
                          
                          let Dtotal = Object.entries(setDadosStrucutur(dadosRetornados.object.metadata)).map(([key, value]) => ({ key, value }));

                          //clone array
                          dadosTodos = [...Dtotal]; 
                          console.log(dadosRetornados);

                          dadosTodos.sort((a, b) => 0.5 - Math.random());
                          console.log(dadosTodos);

                          filter('type','teapot');
                          reOrder('title','false');

                          setArmario();//set armario com espacoas 
                          setInArmario();//set data no armario com os espacos
                          displayArmario(nItensR);

                          updateRows();
                          loadRow();
                         
                          hoverObjs = document.querySelectorAll('.hoverPiece');

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
          updateRows();
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
                    aux = '0 0 260 255';
                    auxB = 'TextCurv';
                    auxC = dado.value.title;
                }else{
                    aux = '0 0 260 230';
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
        let rows2 = [];
        let allrows = [];
        let aux2;
        let aux3;
        let allMedidas=0;
        //string 
        let medidas;

        if(dadosOrdenados.length>0){
              for(let i = 0; i<dispMostrar.length; i++){ 
                  allMedidas=0;

                  rows[i] = document.createElement('div');
                  rows[i].setAttribute('class','grid-item');

                  allrows[i] = document.createElement('div');
                  allrows[i].setAttribute('class','grid-contain-2');

                  rows2[i] = document.createElement('div');
                  rows2[i].setAttribute('class','contentLoading');
                  aux3 = document.createElement('div');
                  aux3.setAttribute('class','contentAviso');
                  aux3.innerText = "Carregar As Prateleiras";
                  rows2[i].appendChild(aux3);
                  

                  if (i % 2 === 0) {
                    allrows[i].style.backgroundImage = 'url("' + imageUrlEven + '")';
                  } else {
                    allrows[i].style.backgroundImage = 'url("' + imageUrlOdd + '")';
                  }

                      for(let j = 0;  j<dispMostrar[i].length; j++){
                          if(dispMostrar[i][j].i!='-'){
                              aux2 = loadItem(dispMostrar[i][j],i,j);
                              console.log(aux2);
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

                      //rows[i].style.gridTemplateColumns = 

                  allrows[i].appendChild(rows[i]);
                  allrows[i].appendChild(rows2[i]);

                  gridContainer.appendChild(allrows[i]);

                }if(dispMostrar.length<3){
                  for(let i=0; i<3-dispMostrar.length; i++){
                    allrows[i] = document.createElement('div');
                    allrows[i].setAttribute('class','grid-contain-2');
    
                    rows2[i] = document.createElement('div');
                    rows2[i].setAttribute('class','contentVazio');
                    aux3 = document.createElement('div');
                    aux3.setAttribute('class','contentAviso');
                    aux3.innerText = "Sem Produtos para Preencher";
                    rows2[i].appendChild(aux3);
    
                    if (i % 2 === 0) {
                      allrows[i].style.backgroundImage = 'url("' + imageUrlEven + '")';
                    } else {
                      allrows[i].style.backgroundImage = 'url("' + imageUrlOdd + '")';
                    }
    
                    allrows[i].appendChild(rows2[i]);
                    gridContainer.appendChild(allrows[i]);
              }                
                }
        }else{
          for(let i=0; i<3; i++){
                allrows[i] = document.createElement('div');
                allrows[i].setAttribute('class','grid-contain-2');

                rows2[i] = document.createElement('div');
                rows2[i].setAttribute('class','contentVazio');
                aux3 = document.createElement('div');
                aux3.setAttribute('class','contentAviso');
                aux3.innerText = "Sem Produtos para Preencher";
                rows2[i].appendChild(aux3);

                if (i % 2 === 0) {
                  allrows[i].style.backgroundImage = 'url("' + imageUrlEven + '")';
                } else {
                  allrows[i].style.backgroundImage = 'url("' + imageUrlOdd + '")';
                }

                allrows[i].appendChild(rows2[i]);
                gridContainer.appendChild(allrows[i]);
          }
        }
        setVisisbilidade();
      }

      function setVisisbilidade(){
          let rows = document.querySelectorAll('.grid-item');
          let rows2 = document.querySelectorAll('.contentLoading');
          
          for(let i=0; i<rows.length; i++){
                if(!rowsCarregadas[i]){
                  if(!rows[i].classList.contains('none')){
                    rows[i].classList.add('none');
                  }
                  if(rows2[i].classList.contains('none')){
                    rows2[i].classList.remove('none');
                  }
                  console.log(rowsCarregadas[i]);
                }else{
                  if(!rows2[i].classList.contains('none')){
                    rows2[i].classList.add('none');
                  }
                  
                  if(rows[i].classList.contains('none')){
                    rows[i].classList.remove('none');
                  }
                  console.log("asdaddadsd2");
                }
          }

          console.log(setVisisbilidade);
      }
      
      function loadedImage(id,callback){ //id-> id da peca
                //Se o id da imagem igual ao do array de carregamento
                //Load por id para que depois de ordenar as pecas as pecas se mantenham com o status certo  
                  let item = itensCarregados.find((ele) => ele.idd === id);
                    //console.log(item);
                    item.status = true;

                //Obter a imagem de origem ja carregada para obter o comprimento e largura
                  var imagem = new Image();
                  let image = dadosTodos.find((ele)=> ele.value.i === id);

                  console.log(image);
                  imagem.src = image.value.image.url;
                  console.log(imagem.width , imagem.height);
                
                  item.w = imagem.width;
                  item.h = imagem.height;

                //Verifcar se todas as imagens estão carregadas
                checkAllLoaded();
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

            console.log(itensPerColocar);
            console.log(dispOriginal);
            console.log(cont);
            console.log(esp);
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
          console.log(rowsCarregadas);
        }

        setVisisbilidade();

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
          function filter(){
            if(dadosTodos!=null && dadosTodos.length>0){
              if(filterOp!=null && filterOp!=undefined){

                let dataFiltrada = [];

                //FILTER TYPE
                    if(filterOp[0] !=''){//alterar para um array e um find 
                      dataFiltrada = [...dadosTodos].filter( dado => dado.value.subtitle.toLowerCase() === filterOp[0]);

                //FILTER DECADE
                    }
                    if(filterOp[1] !=''){ //alterar para um array e um find 
                      dataFiltrada = [...dataFiltrada].filter( dado => dado.value.decade.toLowerCase() === filterOp[1]);
                    }
                    if(filterOp[2] !=''){
                        const padrao = new RegExp(filterOp[2], 'i');
                        dataFiltrada = [...dataFiltrada].filter(dado => padrao.test(dado.value.title.toLowerCase()));
                    }

                    if(filterOp[1] =='' && filterOp[0] =='' && filterOp[2] ==''){
                      dataFiltrada = [...dadosTodos];
                    }

                    dadosFilter = dataFiltrada;
                    console.log(dadosFilter);
                    console.log(filterOp);

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
          setVisisbilidade();
        }

        lastNItensR = nItensR;
      }