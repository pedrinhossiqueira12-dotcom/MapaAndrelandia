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

const LIMITES_OVERLAY = CONFIG.limites;
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

            preferCanvas:true,

            minZoom:CONFIG.zoomMinimo,

            maxZoom:CONFIG.zoomMaximo,

            maxBounds:CONFIG.limites,

            maxBoundsViscosity:1,

            zoomSnap:.25,

            zoomDelta:.25

        }

    );

    mapa.setView(

        CONFIG.centro,

        CONFIG.zoomInicial

    );

    mapa.fitBounds(

        CONFIG.limites

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

/*
=========================================================
PAPEL
=========================================================
*/

function criarCamadaPapel(){

    camadaPapel = L.tileLayer(

        CONFIG.caminhos.mapa +

        "papel.webp",

        {

            tileSize:472,

            noWrap:true,

            opacity:CONFIG.opacidade.papel,

            bounds:CONFIG.limites,

            updateWhenZooming:false,

            updateWhenIdle:true

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

            opacity:CONFIG.opacidade.bairros

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

            opacity:CONFIG.opacidade.vegetacao

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

            opacity:CONFIG.opacidade.mapa

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

            opacity:CONFIG.opacidade.nomesRuas

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

            opacity:CONFIG.opacidade.nomesBairros

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
