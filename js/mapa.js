/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
mapa.js
Versão 3.0
=========================================================
*/

/*
=========================================================
LIMITES
=========================================================
*/

const LIMITES_MAPA = [

    [

        -21.731000,

        -44.320000

    ],

    [

        -21.751000,

        -44.296000

    ]

];

/*
=========================================================
INICIAR MAPA
=========================================================
*/

function iniciarMapa(){

    mapa = L.map(

        "map",

        {

            center:CONFIG.centro,

            zoom:CONFIG.zoomInicial,

            minZoom:CONFIG.zoomMinimo,

            maxZoom:CONFIG.zoomMaximo,

            zoomControl:false,

            attributionControl:false,

            preferCanvas:true,

            zoomSnap:0.25,

            zoomDelta:0.25,

            wheelPxPerZoomLevel:120,

            inertia:true,

            inertiaDeceleration:2500,

            worldCopyJump:false,

            maxBounds:LIMITES_MAPA,

            maxBoundsViscosity:1,

            zoomAnimation:true,

            fadeAnimation:true,

            markerZoomAnimation:true

        }

    );

    criarCamadaSatelite();

    criarPanes();

    criarCamadasSVG();

    criarTexturaPergaminho();

    registrarEventosMapa();

    atualizarModoMapa();

}

/*
=========================================================
PANES
=========================================================
*/

function criarPanes(){

    mapa.createPane(

        "paneSVG"

    );

    mapa.getPane(

        "paneSVG"

    ).style.zIndex = 350;

}

/*
=========================================================
SATÉLITE
=========================================================
*/

function criarCamadaSatelite(){

    camadaSatelite = L.tileLayer(

        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

        {

            attribution:"© Esri",

            maxZoom:20,

            maxNativeZoom:19,

            noWrap:true,

            keepBuffer:6,

            updateWhenIdle:true,

            updateWhenZooming:false

        }

    );

    camadaSatelite.addTo(

        mapa

    );

}
/*
=========================================================
CAMADAS SVG
=========================================================
*/

function criarCamadasSVG(){

    camadasSVG.length = 0;

    adicionarSVG("ruas.svg");

    adicionarSVG("rios.svg");

    adicionarSVG("vegetacao.svg");

    adicionarSVG("trilhas.svg");

    adicionarSVG("desenhos.svg");

}

function adicionarSVG(nome){

    const camada = L.svgOverlay(

        CONFIG.caminhos.overlay + nome,

        LIMITES_MAPA,

        {

            pane:"paneSVG",

            opacity:1,

            interactive:false

        }

    );

    camada.addTo(mapa);

    camadasSVG.push(camada);

}

/*
=========================================================
TEXTURA PERGAMINHO
=========================================================
*/

function criarTexturaPergaminho(){

    let textura = document.getElementById(

        "texturaPergaminho"

    );

    if(textura){

        return;

    }

    textura = document.createElement(

        "div"

    );

    textura.id = "texturaPergaminho";

    textura.style.position = "absolute";

    textura.style.left = "0";

    textura.style.top = "0";

    textura.style.width = "100%";

    textura.style.height = "100%";

    textura.style.pointerEvents = "none";

    textura.style.zIndex = "340";

    textura.style.opacity = ".38";

    textura.style.backgroundImage =
        "url('img/interface/papel.webp')";

    textura.style.backgroundRepeat = "repeat";

    textura.style.backgroundSize = "700px";

    mapa.getContainer().appendChild(

        textura

    );

}

/*
=========================================================
MODOS
=========================================================
*/

function atualizarModoMapa(){

    if(mapaIlustrado){

        ativarModoPergaminho();

    }else{

        ativarModoSatelite();

    }

}

function alternarModoMapa(){

    mapaIlustrado = !mapaIlustrado;

    atualizarModoMapa();

}
/*
=========================================================
MODO PERGAMINHO
=========================================================
*/

function ativarModoPergaminho(){

    document.body.classList.add(

        "modo-pergaminho"

    );

    document.body.classList.remove(

        "modo-satelite"

    );

    const textura = document.getElementById(

        "texturaPergaminho"

    );

    if(textura){

        textura.style.display = "block";

    }

    camadasSVG.forEach(

        camada=>{

            if(!mapa.hasLayer(camada)){

                camada.addTo(mapa);

            }

        }

    );

    atualizarBotaoModo();

}

/*
=========================================================
MODO SATÉLITE
=========================================================
*/

function ativarModoSatelite(){

    document.body.classList.remove(

        "modo-pergaminho"

    );

    document.body.classList.add(

        "modo-satelite"

    );

    const textura = document.getElementById(

        "texturaPergaminho"

    );

    if(textura){

        textura.style.display = "none";

    }

    camadasSVG.forEach(

        camada=>{

            if(mapa.hasLayer(camada)){

                mapa.removeLayer(camada);

            }

        }

    );

    atualizarBotaoModo();

}

/*
=========================================================
BOTÃO SATÉLITE
=========================================================
*/

function atualizarBotaoModo(){

    const botao = document.getElementById(

        "btnSatellite"

    );

    if(!botao){

        return;

    }

    const imagem = botao.querySelector(

        "img"

    );

    if(!imagem){

        return;

    }

    if(mapaIlustrado){

        imagem.src =

            "img/interface/satelite.svg";

        imagem.alt =

            "Modo Satélite";

    }else{

        imagem.src =

            "img/interface/pergaminho.svg";

        imagem.alt =

            "Modo Pergaminho";

    }

}

/*
=========================================================
MOSTRAR / ESCONDER SVGs
=========================================================
*/

function mostrarSVGs(){

    camadasSVG.forEach(

        camada=>{

            if(!mapa.hasLayer(camada)){

                camada.addTo(mapa);

            }

        }

    );

}

function esconderSVGs(){

    camadasSVG.forEach(

        camada=>{

            if(mapa.hasLayer(camada)){

                mapa.removeLayer(camada);

            }

        }

    );

}
/*
=========================================================
EVENTOS
=========================================================
*/

function registrarEventosMapa(){

    mapa.on(

        "click",

        clicarMapa

    );

    mapa.on(

        "zoomend",

        atualizarZoom

    );

    mapa.on(

        "moveend",

        atualizarMovimento

    );

    mapa.on(

        "load",

        mapaCarregado

    );

}

/*
=========================================================
MAPA CARREGADO
=========================================================
*/

function mapaCarregado(){

    atualizarZoom();

    atualizarMovimento();

}

/*
=========================================================
CLIQUE
=========================================================
*/

function clicarMapa(){

    if(typeof fecharSheet==="function"){

        fecharSheet();

    }

}

/*
=========================================================
ZOOM
=========================================================
*/

function atualizarZoom(){

    const zoom = mapa.getZoom();

    document.body.setAttribute(

        "data-zoom",

        zoom

    );

}

/*
=========================================================
MOVIMENTO
=========================================================
*/

function atualizarMovimento(){

    /*
    Reservado para futuras funções
    como carregamento dinâmico,
    clusters e otimizações.
    */

}

/*
=========================================================
CENTRALIZAR MAPA
=========================================================
*/

function centralizarMapa(

    latitude,

    longitude,

    zoom = 18

){

    mapa.flyTo(

        [

            latitude,

            longitude

        ],

        zoom,

        {

            animate:true,

            duration:CONFIG.animacao

        }

    );

}

/*
=========================================================
ENQUADRAR
=========================================================
*/

function enquadrarMapa(bounds){

    mapa.fitBounds(

        bounds,

        {

            padding:[

                40,

                40

            ],

            animate:true

        }

    );

}

/*
=========================================================
REDIMENSIONAR
=========================================================
*/

function atualizarTamanhoMapa(){

    mapa.invalidateSize(

        {

            animate:false

        }

    );

}

window.addEventListener(

    "resize",

    atualizarTamanhoMapa

);/*
=========================================================
ATUALIZAR TEXTURA
=========================================================
*/

function atualizarTexturaPergaminho(){

    const textura = document.getElementById(

        "texturaPergaminho"

    );

    if(!textura){

        return;

    }

    textura.style.display =

        mapaIlustrado

            ? "block"

            : "none";

}

/*
=========================================================
RECARREGAR CAMADAS SVG
=========================================================
*/

function recarregarSVGs(){

    esconderSVGs();

    criarCamadasSVG();

    if(mapaIlustrado){

        mostrarSVGs();

    }

}

/*
=========================================================
ATUALIZAR LIMITES
=========================================================
*/

function atualizarLimites(bounds){

    mapa.setMaxBounds(

        bounds

    );

}

/*
=========================================================
OBTER CENTRO
=========================================================
*/

function obterCentroMapa(){

    return mapa.getCenter();

}

/*
=========================================================
OBTER ZOOM
=========================================================
*/

function obterZoomMapa(){

    return mapa.getZoom();

}

/*
=========================================================
VERIFICAR CAMADA
=========================================================
*/

function possuiCamada(camada){

    return mapa.hasLayer(

        camada

    );

}

/*
=========================================================
REMOVER TODAS AS CAMADAS SVG
=========================================================
*/

function limparCamadasSVG(){

    camadasSVG.forEach(

        camada=>{

            if(mapa.hasLayer(camada)){

                mapa.removeLayer(

                    camada

                );

            }

        }

    );

    camadasSVG.length = 0;

}

/*
=========================================================
ATUALIZAR MODO
=========================================================
*/

function definirModoMapa(pergaminho){

    mapaIlustrado = pergaminho;

    atualizarModoMapa();

    atualizarTexturaPergaminho();

}

/*
=========================================================
REDESENHAR
=========================================================
*/

function redesenharMapa(){

    atualizarTamanhoMapa();

    atualizarModoMapa();

}

/*
=========================================================
EXPORTAR (FUTURO)
=========================================================
*/

window.mapaAPI = {

    centralizarMapa,

    enquadrarMapa,

    atualizarLimites,

    obterCentroMapa,

    obterZoomMapa,

    definirModoMapa,

    redesenharMapa

};

/*
=========================================================
FIM DO ARQUIVO
=========================================================
*/
