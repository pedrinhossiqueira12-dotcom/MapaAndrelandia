/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
mapa.js
Versão 7.0
=========================================================
*/

/*
=========================================================
VARIÁVEIS
=========================================================
*/

let mapa = null;

let mapaIlustrado = true;

let camadaSatelite = null;

let camadaFundo = null;

let camadaMapa = null;

let camadaNomesRuas = null;

let camadaNomesBairros = null;

let marcadorUsuario = null;

let circuloPrecisao = null;

let grupoMarcadores = null;

let marcadores = [];

/*
=========================================================
CONFIGURAÇÃO
=========================================================
*/

const LIMITES_OVERLAY = [

    [
        -21.681117919,
        -44.451251788
    ],

    [
        -21.812963565,
        -44.224268434
    ]

];

const CONFIG = {

    centro: [

        (
            LIMITES_OVERLAY[0][0] +
            LIMITES_OVERLAY[1][0]
        ) / 2,

        (
            LIMITES_OVERLAY[0][1] +
            LIMITES_OVERLAY[1][1]
        ) / 2

    ],

    zoomInicial:16,

    zoomMinimo:13,

    zoomMaximoPergaminho:20,

    zoomMaximoSatelite:20,

    animacao:0.40,

    limites:LIMITES_OVERLAY,

    opacidade:{

        fundo:1,

        mapa:1,

        nomesRuas:1,

        nomesBairros:1

    },

    caminhos:{

        mapa:"img/mapa/",

        icones:"img/icones/",

        interface:"img/interface/",

        locais:"img/locais/"

    }

};

/*
=========================================================
INICIAR MAPA
=========================================================
*/

async function iniciarMapa(){

    preloadImagens();

    criarMapa();

    criarPanes();

    await criarCamadas();

    mapa.off(

        "zoomend",

        atualizarOpacidade

    );

    mapa.on(

        "zoomend",

        atualizarOpacidade

    );

}

/*
=========================================================
CRIAR MAPA
=========================================================
*/

function criarMapa(){

    mapa = L.map(

        "map",

        {

            fadeAnimation:false,

            zoomAnimation:true,

            markerZoomAnimation:false,

            zoomControl:false,

            attributionControl:false,

            preferCanvas:true,

            inertia:true,

            inertiaDeceleration:2500,

            inertiaMaxSpeed:1200,

            zoomSnap:0.25,

            zoomDelta:0.25,

            minZoom:CONFIG.zoomMinimo,

            maxZoom:CONFIG.zoomMaximoPergaminho,

            maxBounds:CONFIG.limites,

            maxBoundsViscosity:1.0,

            worldCopyJump:false,

            preferCanvas:true

        }

    );

    mapa.fitBounds(

        CONFIG.limites,

        {

            animate:false,

            padding:[0,0]

        }

    );

}
/*
=========================================================
CRIAR PANES
=========================================================
*/

function criarPanes(){

    mapa.createPane("fundo");

    mapa.createPane("mapa");

    mapa.createPane("nomesRuas");

    mapa.createPane("nomesBairros");

    mapa.getPane("fundo").style.zIndex = 200;

    mapa.getPane("mapa").style.zIndex = 210;

    mapa.getPane("nomesRuas").style.zIndex = 220;

    mapa.getPane("nomesBairros").style.zIndex = 230;

}

/*
=========================================================
CRIAR CAMADAS
=========================================================
*/

async function criarCamadas(){

    criarCamadaSatelite();

    criarCamadaFundo();

    criarCamadaMapa();

    criarCamadaNomesRuas();

    criarCamadaNomesBairros();

    otimizarCamadas();

    await ativarModoPergaminho();

}

/*
=========================================================
OTIMIZAR CAMADAS
=========================================================
*/

function otimizarCamadas(){

    [

        camadaFundo,

        camadaMapa,

        camadaNomesRuas,

        camadaNomesBairros

    ].forEach(camada=>{

        if(!camada){

            return;

        }

        camada.on("add",()=>{

            const elemento = camada.getElement();

            if(!elemento){

                return;

            }

            elemento.style.pointerEvents="none";

            elemento.style.userSelect="none";

            elemento.style.transformOrigin="center center";

            elemento.style.backfaceVisibility="hidden";

            elemento.style.willChange="transform";

            elemento.style.imageRendering="auto";

            elemento.style.webkitBackfaceVisibility="hidden";

            elemento.style.webkitTransform="translateZ(0)";

        });

    });

}

/*
=========================================================
CAMADA SATÉLITE
=========================================================
*/

function criarCamadaSatelite(){

    camadaSatelite = L.tileLayer(

        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

        {

            maxZoom:20,

            keepBuffer:3,

            updateWhenIdle:true,

            updateWhenZooming:false,

            crossOrigin:true,

            noWrap:true,

            reuseTiles:true,

            unloadInvisibleTiles:true

        }

    );

}

/*
=========================================================
PRÉ-CARREGAR IMAGENS
=========================================================
*/

function preloadImagens(){

    [

        "fundo.png",

        "mapa.svg",

        "nomes-ruas.svg",

        "nomes-bairros.svg"

    ].forEach(arquivo=>{

        const imagem=new Image();

        imagem.decoding="async";

        imagem.loading="eager";

        imagem.src=

            CONFIG.caminhos.mapa+

            arquivo;

    });

}

/*
=========================================================
CAMADA FUNDO
=========================================================
*/

function criarCamadaFundo(){

    camadaFundo=L.imageOverlay(

        CONFIG.caminhos.mapa+"fundo.png",

        LIMITES_OVERLAY,

        {

            pane:"fundo",

            opacity:CONFIG.opacidade.fundo,

            interactive:false

        }

    );

}

/*
=========================================================
CAMADA MAPA
=========================================================
*/

function criarCamadaMapa(){

    camadaMapa=L.imageOverlay(

        CONFIG.caminhos.mapa+"mapa.svg",

        LIMITES_OVERLAY,

        {

            pane:"mapa",

            opacity:CONFIG.opacidade.mapa,

            interactive:false

        }

    );

}

/*
=========================================================
CAMADA NOMES DAS RUAS
=========================================================
*/

function criarCamadaNomesRuas(){

    camadaNomesRuas=L.imageOverlay(

        CONFIG.caminhos.mapa+"nomes-ruas.svg",

        LIMITES_OVERLAY,

        {

            pane:"nomesRuas",

            opacity:CONFIG.opacidade.nomesRuas,

            interactive:false

        }

    );

}

/*
=========================================================
CAMADA NOMES DOS BAIRROS
=========================================================
*/

function criarCamadaNomesBairros(){

    camadaNomesBairros=L.imageOverlay(

        CONFIG.caminhos.mapa+"nomes-bairros.svg",

        LIMITES_OVERLAY,

        {

            pane:"nomesBairros",

            opacity:CONFIG.opacidade.nomesBairros,

            interactive:false

        }

    );

}
/*
=========================================================
ADICIONAR CAMADA
=========================================================
*/

function adicionarCamada(camada){

    if(!camada){

        return;

    }

    if(!mapa.hasLayer(camada)){

        camada.addTo(mapa);

    }

}

/*
=========================================================
REMOVER CAMADA
=========================================================
*/

function removerCamada(camada){

    if(!camada){

        return;

    }

    if(mapa.hasLayer(camada)){

        mapa.removeLayer(camada);

    }

}

/*
=========================================================
REMOVER CAMADAS ILUSTRADAS
=========================================================
*/

function removerCamadasIlustradas(){

    removerCamada(camadaFundo);

    removerCamada(camadaMapa);

    removerCamada(camadaNomesRuas);

    removerCamada(camadaNomesBairros);

}

/*
=========================================================
AGUARDAR
=========================================================
*/

function esperar(ms){

    return new Promise(resolve=>setTimeout(resolve,ms));

}

/*
=========================================================
CARREGAR SATÉLITE
=========================================================
*/

async function carregarSatelite(){

    removerCamadasIlustradas();

    adicionarCamada(camadaSatelite);

}

/*
=========================================================
CARREGAR PERGAMINHO
=========================================================
*/

async function carregarPergaminho(){

    removerCamada(camadaSatelite);

    adicionarCamada(camadaFundo);

    adicionarCamada(camadaMapa);

    atualizarOpacidade();

}

/*
=========================================================
ATIVAR PERGAMINHO
=========================================================
*/

async function ativarModoPergaminho(){

    mapaIlustrado = true;

    mapa.setMaxZoom(CONFIG.zoomMaximoPergaminho);

    await carregarPergaminho();

    document.body.classList.remove("modo-satelite");

    document.body.classList.add("modo-pergaminho");

}

/*
=========================================================
ATIVAR SATÉLITE
=========================================================
*/

async function ativarModoSatelite(){

    mapaIlustrado = false;

    mapa.setMaxZoom(CONFIG.zoomMaximoSatelite);

    await carregarSatelite();

    document.body.classList.remove("modo-pergaminho");

    document.body.classList.add("modo-satelite");

}

/*
=========================================================
ALTERNAR MODO
=========================================================
*/

async function alternarModoMapa(){

    if(mapaIlustrado){

        await ativarModoSatelite();

    }else{

        await ativarModoPergaminho();

    }

}

/*
=========================================================
ATUALIZAR VISIBILIDADE POR ZOOM
=========================================================
*/

function atualizarOpacidade(){

    if(!mapaIlustrado){

        return;

    }

    const zoom = mapa.getZoom();

    /*
    ---------------------------------------------------------
    NOMES DAS RUAS
    ---------------------------------------------------------
    */

    if(zoom >= 17.75){

        adicionarCamada(camadaNomesRuas);

    }else{

        removerCamada(camadaNomesRuas);

    }

    /*
    ---------------------------------------------------------
    NOMES DOS BAIRROS
    ---------------------------------------------------------
    */

    if(zoom >= 17 && zoom < 19.75){

        adicionarCamada(camadaNomesBairros);

    }else{

        removerCamada(camadaNomesBairros);

    }

}
/*
=========================================================
OBTER MAPA
=========================================================
*/

function obterMapa(){

    return mapa;

}

/*
=========================================================
OBTER ZOOM
=========================================================
*/

function obterZoom(){

    if(!mapa){

        return CONFIG.zoomInicial;

    }

    return mapa.getZoom();

}

/*
=========================================================
DEFINIR ZOOM
=========================================================
*/

function definirZoom(zoom){

    if(!mapa){

        return;

    }

    mapa.setZoom(

        zoom,

        {

            animate:true

        }

    );

}

/*
=========================================================
CENTRALIZAR MAPA
=========================================================
*/

function centralizarMapa(

    latitude,

    longitude,

    zoom = mapa.getZoom()

){

    if(!mapa){

        return;

    }

    mapa.flyTo(

        [

            latitude,

            longitude

        ],

        zoom,

        {

            animate:true,

            duration:CONFIG.animacao,

            easeLinearity:.25

        }

    );

}

/*
=========================================================
LIMITES
=========================================================
*/

function obterLimitesMapa(){

    if(!mapa){

        return null;

    }

    return mapa.getBounds();

}

/*
=========================================================
ATUALIZAR MAPA
=========================================================
*/

function atualizarMapa(){

    if(!mapa){

        return;

    }

    mapa.invalidateSize(

        {

            animate:false

        }

    );

}

/*
=========================================================
REDIMENSIONAR
=========================================================
*/

let temporizadorResize = null;

window.addEventListener(

    "resize",

    ()=>{

        clearTimeout(

            temporizadorResize

        );

        temporizadorResize = setTimeout(

            ()=>{

                atualizarMapa();

            },

            150

        );

    }

);

/*
=========================================================
CARREGAMENTO COMPLETO
=========================================================
*/

window.addEventListener(

    "load",

    ()=>{

        atualizarMapa();

    }

);

/*
=========================================================
API
=========================================================
*/

window.mapaAPI = {

    obterMapa,

    obterZoom,

    definirZoom,

    centralizarMapa,

    obterLimitesMapa,

    atualizarMapa,

    alternarModoMapa,

    ativarModoPergaminho,

    ativarModoSatelite

};

/*
=========================================================
FIM
=========================================================
*/
