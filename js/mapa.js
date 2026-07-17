/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
mapa.js
Versão 4.0
=========================================================
*/

/*
=========================================================
VARIÁVEIS GLOBAIS
=========================================================
*/

let mapa = null;

let camadaSatelite = null;

let camadaPapel = null;

let camadaBairros = null;

let camadaVegetacao = null;

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

const CONFIG = {

    centro: [

        -21.74135,

        -44.30920

    ],

    zoomInicial:16,

    zoomMinimo:14,

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

    caminhos:{

        mapa:"img/mapa/",

        icones:"img/icones/",

        interface:"img/interface/",

        locais:"img/locais/"

    }

};

/*
=========================================================
OVERLAY DO MAPA
=========================================================
*/

const LIMITES_OVERLAY = [

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
INICIALIZAR MAPA
=========================================================
*/

document.addEventListener(

    "DOMContentLoaded",

    iniciarMapa

);

function iniciarMapa(){

    criarMapa();

    criarCamadas();

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

            zoomControl:false,

            attributionControl:false,

            minZoom:CONFIG.zoomMinimo,

            maxZoom:CONFIG.zoomMaximo,

            maxBounds:CONFIG.limites,

            maxBoundsViscosity:1,

            preferCanvas:true

        }

    );

    mapa.setView(

        CONFIG.centro,

        CONFIG.zoomInicial

    );

}

/*
=========================================================
CRIAR CAMADAS
=========================================================
*/

function criarCamadas(){

    criarCamadaSatelite();

    criarCamadaPapel();

    criarCamadaBairros();

    criarCamadaVegetacao();

    criarCamadaMapa();

    criarCamadaNomesRuas();

    criarCamadaNomesBairros();

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

            maxZoom:20,

            crossOrigin:true

        }

    );

    camadaSatelite.addTo(

        mapa

    );

}
/*
=========================================================
PAPEL
=========================================================
*/

function criarCamadaPapel(){

    camadaPapel = L.imageOverlay(

        CONFIG.caminhos.mapa + "papel.webp",

        LIMITES_OVERLAY,

        {

            opacity:1,

            interactive:false

        }

    );

    camadaPapel.addTo(

        mapa

    );

}

/*
=========================================================
BAIRROS
=========================================================
*/

function criarCamadaBairros(){

    camadaBairros = L.imageOverlay(

        CONFIG.caminhos.mapa + "bairros.svg",

        LIMITES_OVERLAY,

        {

            opacity:1,

            interactive:false

        }

    );

    camadaBairros.addTo(

        mapa

    );

}

/*
=========================================================
VEGETAÇÃO
=========================================================
*/

function criarCamadaVegetacao(){

    camadaVegetacao = L.imageOverlay(

        CONFIG.caminhos.mapa + "vegetacao.svg",

        LIMITES_OVERLAY,

        {

            opacity:1,

            interactive:false

        }

    );

    camadaVegetacao.addTo(

        mapa

    );

}

/*
=========================================================
MAPA
=========================================================
*/

function criarCamadaMapa(){

    camadaMapa = L.imageOverlay(

        CONFIG.caminhos.mapa + "mapa.svg",

        LIMITES_OVERLAY,

        {

            opacity:1,

            interactive:false

        }

    );

    camadaMapa.addTo(

        mapa

    );

}

/*
=========================================================
NOMES DAS RUAS
=========================================================
*/

function criarCamadaNomesRuas(){

    camadaNomesRuas = L.imageOverlay(

        CONFIG.caminhos.mapa + "nomes-ruas.svg",

        LIMITES_OVERLAY,

        {

            opacity:1,

            interactive:false

        }

    );

    camadaNomesRuas.addTo(

        mapa

    );

}

/*
=========================================================
NOMES DOS BAIRROS
=========================================================
*/

function criarCamadaNomesBairros(){

    camadaNomesBairros = L.imageOverlay(

        CONFIG.caminhos.mapa + "nomes-bairros.svg",

        LIMITES_OVERLAY,

        {

            opacity:1,

            interactive:false

        }

    );

    camadaNomesBairros.addTo(

        mapa

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
ALTERAR ZOOM
=========================================================
*/

function definirZoom(zoom){

    if(!mapa){

        return;

    }

    mapa.setZoom(zoom);

}

/*
=========================================================
LIMITES
=========================================================
*/

function obterLimitesMapa(){

    return mapa.getBounds();

}

/*
=========================================================
REDIMENSIONAR
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
EVENTOS
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

    atualizarMapa

};

/*
=========================================================
FIM
=========================================================
*/
