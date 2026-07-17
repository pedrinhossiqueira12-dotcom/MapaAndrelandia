/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
mapa.js
Versão 6.0
=========================================================
*/

/*
=========================================================
VARIÁVEIS GLOBAIS
=========================================================
*/

let mapa = null;

let mapaIlustrado = true;

/*-------------------------------------------------------
CAMADAS
-------------------------------------------------------*/

let camadaSatelite = null;

let camadaPapel = null;

let camadaBairros = null;

let camadaVegetacao = null;

let camadaMapa = null;

let camadaNomesRuas = null;

let camadaNomesBairros = null;

/*-------------------------------------------------------
GPS
-------------------------------------------------------*/

let marcadorUsuario = null;

let circuloPrecisao = null;

/*-------------------------------------------------------
MARCADORES
-------------------------------------------------------*/

let grupoMarcadores = null;

let marcadores = [];

/*
=========================================================
CONFIGURAÇÃO
=========================================================
*/

const CONFIG = {

    centro:[

        -21.74135,

        -44.30920

    ],

    zoomInicial:16,

    zoomMinimo:16,

    zoomMaximo:20,

    animacao:.40,

    limites:[

        [

            -21.731000,

            -44.320000

        ],

        [

            -21.751000,

            -44.296000

        ]

    ],

    opacidade:{

        papel:1,

        bairros:.35,

        vegetacao:.55,

        mapa:1,

        nomesRuas:1,

        nomesBairros:1

    },

    caminhos:{

        mapa:"img/mapa/",

        interface:"img/interface/",

        icones:"img/icones/",

        locais:"img/locais/"

    }

};

/*
=========================================================
LIMITES DOS OVERLAYS
=========================================================
*/

const LIMITES_OVERLAY = CONFIG.limites;

/*
=========================================================
INICIALIZAÇÃO
=========================================================
*/

async function iniciarMapa(){

    criarMapa();

    criarPanes();

    criarGridPapel();

    await criarCamadas();

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

            /*---------------------------------------------
            CONTROLES
            ---------------------------------------------*/

            zoomControl:false,

            attributionControl:false,

            preferCanvas:true,

            /*---------------------------------------------
            ZOOM
            ---------------------------------------------*/

            minZoom:CONFIG.zoomMinimo,

            maxZoom:CONFIG.zoomMaximo,

            zoomSnap:.25,

            zoomDelta:.25,

            /*---------------------------------------------
            LIMITES
            ---------------------------------------------*/

            maxBounds:CONFIG.limites,

            maxBoundsViscosity:1,

            worldCopyJump:false,

            noWrap:true,

            /*---------------------------------------------
            PERFORMANCE
            ---------------------------------------------*/

            inertia:true,

            inertiaDeceleration:5000,

            inertiaMaxSpeed:2500,

            easeLinearity:.20,

            updateWhenIdle:true,

            updateWhenZooming:false,

            fadeAnimation:false,

            zoomAnimation:true,

            markerZoomAnimation:false,

            wheelDebounceTime:30,

            renderer:L.canvas()

        }

    );

    mapa.setView(

        CONFIG.centro,

        CONFIG.zoomInicial

    );

    mapa.fitBounds(

        CONFIG.limites

    );

    mapa.setMaxBounds(

        CONFIG.limites

    );

    mapa.on(

        "resize",

        ()=>{

            mapa.invalidateSize();

        }

    );

}
/*
=========================================================
CRIAR PANES
=========================================================
*/

function criarPanes(){

    /*-----------------------------------------------------
    SATÉLITE
    -----------------------------------------------------*/

    mapa.createPane(

        "satelite"

    );

    mapa.getPane(

        "satelite"

    ).style.zIndex = 100;

    /*-----------------------------------------------------
    PAPEL
    -----------------------------------------------------*/

    mapa.createPane(

        "papel"

    );

    mapa.getPane(

        "papel"

    ).style.zIndex = 200;

    /*-----------------------------------------------------
    BAIRROS
    -----------------------------------------------------*/

    mapa.createPane(

        "bairros"

    );

    mapa.getPane(

        "bairros"

    ).style.zIndex = 210;

    /*-----------------------------------------------------
    VEGETAÇÃO
    -----------------------------------------------------*/

    mapa.createPane(

        "vegetacao"

    );

    mapa.getPane(

        "vegetacao"

    ).style.zIndex = 220;

    /*-----------------------------------------------------
    MAPA DESENHADO
    -----------------------------------------------------*/

    mapa.createPane(

        "mapa"

    );

    mapa.getPane(

        "mapa"

    ).style.zIndex = 230;

    /*-----------------------------------------------------
    NOMES DAS RUAS
    -----------------------------------------------------*/

    mapa.createPane(

        "nomesRuas"

    );

    mapa.getPane(

        "nomesRuas"

    ).style.zIndex = 240;

    /*-----------------------------------------------------
    NOMES DOS BAIRROS
    -----------------------------------------------------*/

    mapa.createPane(

        "nomesBairros"

    );

    mapa.getPane(

        "nomesBairros"

    ).style.zIndex = 250;

    /*-----------------------------------------------------
    MARCADORES
    -----------------------------------------------------*/

    mapa.createPane(

        "marcadores"

    );

    mapa.getPane(

        "marcadores"

    ).style.zIndex = 300;

    /*-----------------------------------------------------
    GPS
    -----------------------------------------------------*/

    mapa.createPane(

        "gps"

    );

    mapa.getPane(

        "gps"

    ).style.zIndex = 310;

    /*-----------------------------------------------------
    POPUPS
    -----------------------------------------------------*/

    mapa.createPane(

        "popups"

    );

    mapa.getPane(

        "popups"

    ).style.zIndex = 400;

}
/*
=========================================================
GRID LAYER - PAPEL
=========================================================
*/

const CamadaPapel = L.GridLayer.extend({

    createTile:function(coords){

        const tile = document.createElement(

            "canvas"

        );

        const tamanho = this.getTileSize();

        tile.width = tamanho.x;

        tile.height = tamanho.y;

        const contexto = tile.getContext(

            "2d"

        );

        const imagem = new Image();

        imagem.src =

            CONFIG.caminhos.mapa +

            "papel.webp";

        imagem.onload = ()=>{

            const padrao =

                contexto.createPattern(

                    imagem,

                    "repeat"

                );

            contexto.fillStyle = padrao;

            contexto.globalAlpha =

                CONFIG.opacidade.papel;

            contexto.fillRect(

                0,

                0,

                tamanho.x,

                tamanho.y

            );

        };

        return tile;

    }

});
/*
=========================================================
CRIAR CAMADA PAPEL
=========================================================
*/

function criarGridPapel(){

    camadaPapel = new CamadaPapel(

        {

            pane:"papel",

            tileSize:512,

            keepBuffer:2,

            updateWhenIdle:true,

            updateWhenZooming:false,

            noWrap:true

        }

    );

}
/*
=========================================================
CRIAR CAMADAS
=========================================================
*/

async function criarCamadas(){

    criarCamadaSatelite();

    criarCamadaBairros();

    criarCamadaVegetacao();

    criarCamadaMapa();

    criarCamadaNomesRuas();

    criarCamadaNomesBairros();

    if(mapaIlustrado){

        await carregarPergaminho();

    }

    else{

        await carregarSatelite();

    }

}
/*
=========================================================
CRIAR CAMADA SATÉLITE
=========================================================
*/

function criarCamadaSatelite(){

    camadaSatelite = L.tileLayer(

        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

        {

            pane:"satelite",

            maxZoom:20,

            crossOrigin:true,

            keepBuffer:2,

            updateWhenIdle:true,

            updateWhenZooming:false,

            noWrap:true

        }

    );

}
/*
=========================================================
CRIAR CAMADA BAIRROS
=========================================================
*/

function criarCamadaBairros(){

    camadaBairros = L.imageOverlay(

        CONFIG.caminhos.mapa +

        "bairros.svg",

        LIMITES_OVERLAY,

        {

            pane:"bairros",

            opacity:CONFIG.opacidade.bairros,

            interactive:false

        }

    );

}
/*
=========================================================
CRIAR CAMADA VEGETAÇÃO
=========================================================
*/

function criarCamadaVegetacao(){

    camadaVegetacao = L.imageOverlay(

        CONFIG.caminhos.mapa +

        "vegetacao.svg",

        LIMITES_OVERLAY,

        {

            pane:"vegetacao",

            opacity:CONFIG.opacidade.vegetacao,

            interactive:false

        }

    );

}
/*
=========================================================
CRIAR CAMADA MAPA
=========================================================
*/

function criarCamadaMapa(){

    camadaMapa = L.imageOverlay(

        CONFIG.caminhos.mapa +

        "mapa.svg",

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
CRIAR CAMADA NOMES DAS RUAS
=========================================================
*/

function criarCamadaNomesRuas(){

    camadaNomesRuas = L.imageOverlay(

        CONFIG.caminhos.mapa +

        "nomes-ruas.svg",

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
CRIAR CAMADA NOMES DOS BAIRROS
=========================================================
*/

function criarCamadaNomesBairros(){

    camadaNomesBairros = L.imageOverlay(

        CONFIG.caminhos.mapa +

        "nomes-bairros.svg",

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

    if(

        camada &&

        !mapa.hasLayer(camada)

    ){

        camada.addTo(

            mapa

        );

    }

}
/*
=========================================================
REMOVER CAMADA
=========================================================
*/

function removerCamada(camada){

    if(

        camada &&

        mapa.hasLayer(camada)

    ){

        mapa.removeLayer(

            camada

        );

    }

}
/*
=========================================================
REMOVER CAMADAS ILUSTRADAS
=========================================================
*/

function removerCamadasIlustradas(){

    removerCamada(

        camadaPapel

    );

    removerCamada(

        camadaBairros

    );

    removerCamada(

        camadaVegetacao

    );

    removerCamada(

        camadaMapa

    );

    removerCamada(

        camadaNomesRuas

    );

    removerCamada(

        camadaNomesBairros

    );

}
/*
=========================================================
AGUARDAR
=========================================================
*/

function esperar(ms){

    return new Promise(

        resolve=>setTimeout(

            resolve,

            ms

        )

    );

}
/*
=========================================================
CARREGAR PERGAMINHO
=========================================================
*/

async function carregarPergaminho(){

    removerCamada(

        camadaSatelite

    );

    adicionarCamada(

        camadaMapa

    );

    await esperar(30);

    adicionarCamada(

        camadaPapel

    );

    await esperar(30);

    adicionarCamada(

        camadaVegetacao

    );

    adicionarCamada(

        camadaBairros

    );

    await esperar(30);

    adicionarCamada(

        camadaNomesRuas

    );

    adicionarCamada(

        camadaNomesBairros

    );

}
/*
=========================================================
CARREGAR SATÉLITE
=========================================================
*/

async function carregarSatelite(){

    removerCamadasIlustradas();

    adicionarCamada(

        camadaSatelite

    );

}
/*
=========================================================
ATUALIZAR OPACIDADE POR ZOOM
=========================================================
*/

function atualizarOpacidade(){

    if(!mapaIlustrado){

        return;

    }

    const zoom = mapa.getZoom();

    /*
    -----------------------------------------
    NOMES DAS RUAS
    -----------------------------------------
    */

    if(zoom >= 18){

        camadaNomesRuas.setOpacity(1);

    }

    else if(zoom >= 17){

        camadaNomesRuas.setOpacity(.60);

    }

    else{

        camadaNomesRuas.setOpacity(0);

    }

    /*
    -----------------------------------------
    NOMES DOS BAIRROS
    -----------------------------------------
    */

    if(zoom >= 20){

        camadaNomesBairros.setOpacity(0);

    }

    else if(zoom >= 19){

        camadaNomesBairros.setOpacity(.40);

    }

    else if(zoom >= 17){

        camadaNomesBairros.setOpacity(1);

    }

    else{

        camadaNomesBairros.setOpacity(.30);

    }

}
/*
=========================================================
ATIVAR PERGAMINHO
=========================================================
*/

async function ativarModoPergaminho(){

    mapaIlustrado = true;

    await carregarPergaminho();

    atualizarOpacidade();

    document.body.classList.remove(

        "modo-satelite"

    );

    document.body.classList.add(

        "modo-pergaminho"

    );

}
/*
=========================================================
ATIVAR SATÉLITE
=========================================================
*/

async function ativarModoSatelite(){

    mapaIlustrado = false;

    await carregarSatelite();

    document.body.classList.remove(

        "modo-pergaminho"

    );

    document.body.classList.add(

        "modo-satelite"

    );

}
/*
=========================================================
ALTERNAR MODO
=========================================================
*/

async function alternarModoMapa(){

    if(mapaIlustrado){

        await ativarModoSatelite();

    }

    else{

        await ativarModoPergaminho();

    }

}
async function iniciarMapa(){

    criarMapa();

    criarPanes();

    criarGridPapel();

    await criarCamadas();

    mapa.on(

        "zoomend",

        atualizarOpacidade

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

            duration:CONFIG.animacao

        }

    );

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

function definirZoom(

    zoom

){

    if(!mapa){

        return;

    }

    mapa.setZoom(

        zoom

    );

}
/*
=========================================================
OBTER LIMITES
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

    mapa.invalidateSize();

}
/*
=========================================================
REDIMENSIONAMENTO
=========================================================
*/

window.addEventListener(

    "resize",

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
