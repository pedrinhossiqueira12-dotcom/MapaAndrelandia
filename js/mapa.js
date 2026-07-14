/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
mapa.js
Versão 1.0
=========================================================
*/

/*
=========================================================
MAPA
=========================================================
*/

function iniciarMapa() {

    mapa = L.map("map", {

        center: CONFIG.centro,

        zoom: CONFIG.zoomInicial,

        minZoom: CONFIG.zoomMinimo,

        maxZoom: CONFIG.zoomMaximo,

        zoomControl: false,

        attributionControl: true,

        preferCanvas: true,

        zoomSnap: 0.25,

        zoomDelta: 0.25,

        wheelPxPerZoomLevel: 120,

        doubleClickZoom: true

    });

    criarCamadaSatelite();

    criarCamadasSVG();

}

/*
=========================================================
SATÉLITE ESRI
=========================================================
*/

function criarCamadaSatelite(){

    camadaSatelite = L.tileLayer(

        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

        {

            attribution:"© Esri",

            maxZoom:20

        }

    );

    camadaSatelite.addTo(mapa);

}

/*
=========================================================
CAMADAS SVG
=========================================================
*/

/*
IMPORTANTE

Os limites abaixo são apenas provisórios.

Quando tivermos o SVG definitivo iremos
ajustar exatamente aos seus limites reais.
*/

const LIMITES_SVG = [

    [-21.736000,-44.315000],

    [-21.747000,-44.301000]

];

/*
=========================================================
RUAS
=========================================================
*/

function criarCamadasSVG(){

    camadaRuas = L.svgOverlay(

        CONFIG.caminhos.overlay + "ruas.svg",

        LIMITES_SVG,

        {

            opacity:1,

            interactive:false

        }

    );

    camadaVegetacao = L.svgOverlay(

        CONFIG.caminhos.overlay + "vegetacao.svg",

        LIMITES_SVG,

        {

            opacity:1,

            interactive:false

        }

    );

    camadaRios = L.svgOverlay(

        CONFIG.caminhos.overlay + "rios.svg",

        LIMITES_SVG,

        {

            opacity:1,

            interactive:false

        }

    );

    camadaDesenhos = L.svgOverlay(

        CONFIG.caminhos.overlay + "desenhos.svg",

        LIMITES_SVG,

        {

            opacity:1,

            interactive:false

        }

    );

    /*
    Todas iniciam ligadas.
    */

    camadaRuas.addTo(mapa);

    camadaVegetacao.addTo(mapa);

    camadaRios.addTo(mapa);

    camadaDesenhos.addTo(mapa);

}

/*
=========================================================
CONTROLE DAS CAMADAS
=========================================================
*/

function ligarCamada(camada){

    if(!mapa.hasLayer(camada)){

        camada.addTo(mapa);

    }

}

function desligarCamada(camada){

    if(mapa.hasLayer(camada)){

        mapa.removeLayer(camada);

    }

}

function alternarCamada(camada){

    if(mapa.hasLayer(camada)){

        mapa.removeLayer(camada);

    }else{

        camada.addTo(mapa);

    }

}

/*
=========================================================
CENTRALIZAR
=========================================================
*/

function irPara(lat,lng,zoom=18){

    mapa.flyTo(

        [lat,lng],

        zoom,

        {

            animate:true,

            duration:CONFIG.animacao

        }

    );

}

/*
=========================================================
AJUSTAR ÁREA
=========================================================
*/

function enquadrar(bounds){

    mapa.fitBounds(

        bounds,

        {

            padding:[50,50]

        }

    );

}

/*
=========================================================
EVENTOS
=========================================================
*/

mapa?.on?.("zoomend",()=>{

    // reservado para futuras otimizações

});

mapa?.on?.("moveend",()=>{

    // reservado para carregamento dinâmico

});
