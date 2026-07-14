/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
mapa.js
Versão 2.0
=========================================================
*/

/*
=========================================================
MAPA
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

            maxBoundsViscosity:1

        }

    );

    criarLimites();

    criarCamadaSatelite();

    criarSVGs();

    registrarEventos();

}
/*
=========================================================
LIMITES
=========================================================
*/

/*
Ajustaremos essas coordenadas quando
o SVG definitivo estiver pronto.
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

function criarLimites(){

    mapa.setMaxBounds(

        LIMITES_MAPA

    );

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

            maxZoom:20

        }

    );

    camadaSatelite.addTo(mapa);

}
/*
=========================================================
SVGS
=========================================================
*/

function criarSVGs(){

    camadasSVG=[];

    adicionarSVG(

        "ruas.svg"

    );

    adicionarSVG(

        "rios.svg"

    );

    adicionarSVG(

        "vegetacao.svg"

    );

    adicionarSVG(

        "trilhas.svg"

    );

    adicionarSVG(

        "desenhos.svg"

    );

}

function adicionarSVG(nome){

    const camada=L.svgOverlay(

        CONFIG.caminhos.overlay+nome,

        LIMITES_MAPA,

        {

            interactive:false,

            opacity:1

        }

    );

    camada.addTo(mapa);

    camadasSVG.push(

        camada

    );

}
/*
=========================================================
EVENTOS
=========================================================
*/

function registrarEventos(){

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

}

/*
=========================================================
CLICK
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

    const centro = mapa.getCenter();

    log(

        "Centro:",

        centro.lat.toFixed(6),

        centro.lng.toFixed(6)

    );

}
/*
=========================================================
CENTRALIZAR
=========================================================
*/

function centralizarMapa(

    lat,

    lng,

    zoom=18

){

    mapa.flyTo(

        [

            lat,

            lng

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

            padding:[40,40]

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

);
/*
=========================================================
TEXTURA DO PERGAMINHO
=========================================================
*/

function atualizarTextura(){

    const pane = mapa.getPanes().overlayPane;

    let textura =

        document.getElementById(

            "texturaPergaminho"

        );

    if(!textura){

        textura=document.createElement(

            "div"

        );

        textura.id="texturaPergaminho";

        pane.prepend(

            textura

        );

    }

}

/*
=========================================================
MODO INICIAL
=========================================================
*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        setTimeout(

            ()=>{

                atualizarTextura();

                atualizarModoMapa();

            },

            300

        );

    }

);
