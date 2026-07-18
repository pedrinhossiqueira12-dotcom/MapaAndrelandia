/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
mapa.js
Versão 6.0
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

const CONFIG = {

    centro:[

        -21.74135,

        -44.30920

    ],

    zoomInicial:16,

    zoomMinimo:16,

    zoomMaximoPergaminho:20,

    zoomMaximoSatelite:18,

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

const LIMITES_OVERLAY = CONFIG.limites;
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
            updateWhenIdle:true,

            updateWhenZooming:false,

            fadeAnimation:false,

            zoomAnimation:true,

            markerZoomAnimation:false,
    
            zoomControl:false,

            attributionControl:false,

            preferCanvas:true,

            minZoom:CONFIG.zoomMinimo,

            maxZoom:CONFIG.zoomMaximoPergaminho,

            maxBounds:CONFIG.limites,

            maxBoundsViscosity:1,

            zoomSnap:.25,

            zoomDelta:.25,
                

        }

    );
mapa.options.inertia = true;

mapa.options.inertiaDeceleration = 2500;

mapa.options.inertiaMaxSpeed = 1200;
    
    mapa.setView(

        CONFIG.centro,

        CONFIG.zoomInicial

    );

    mapa.fitBounds(

        CONFIG.limites

    );
    mapa.panInsideBounds(

    CONFIG.limites

);

}
/*
=========================================================
CRIAR PANES
=========================================================
*/

function criarPanes(){

    mapa.createPane(

        "fundo"

    );

    mapa.createPane(

        "mapa"

    );

    mapa.createPane(

        "nomesRuas"

    );

    mapa.createPane(

        "nomesBairros"

    );

    mapa.getPane(

        "fundo"

    ).style.zIndex = 200;

    mapa.getPane(

        "mapa"

    ).style.zIndex = 210;

    mapa.getPane(

        "nomesRuas"

    ).style.zIndex = 220;

    mapa.getPane(

        "nomesBairros"

    ).style.zIndex = 230;

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

    const camadas = [

        camadaFundo,

        camadaMapa,

        camadaNomesRuas,

        camadaNomesBairros

    ];

    camadas.forEach(

        camada=>{

            if(!camada){

                return;

            }

            camada.on(

                "add",

                ()=>{

                    const elemento = camada.getElement();

                    if(!elemento){

                        return;

                    }

                    elemento.style.pointerEvents =

                        "none";

                    elemento.style.userSelect =

                        "none";

                    elemento.style.willChange =

                        "transform";

                    elemento.style.transformOrigin =

                        "center center";

                    elemento.style.backfaceVisibility =

                        "hidden";


                }

            );

        }

    );

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

            crossOrigin:true,

            keepBuffer:1,

            updateWhenIdle:true,

            updateWhenZooming:false,

            noWrap:true,

            unloadInvisibleTiles:true,

            reuseTiles:true

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

    ].forEach(

        arquivo=>{

            const imagem = new Image();

            imagem.src =

                CONFIG.caminhos.mapa +

                arquivo;

        }

    );

}
/*
=========================================================
CAMADA FUNDO
=========================================================
*/

function criarCamadaFundo(){

    camadaFundo = L.imageOverlay(

        CONFIG.caminhos.mapa +

        "fundo.png",

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
CAMADA NOMES DAS RUAS
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
CAMADA NOMES DOS BAIRROS
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

        camadaFundo

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
    -----------------------------------------------------
    NOMES DAS RUAS
    -----------------------------------------------------
    */

    if(zoom >= 18){

        camadaNomesRuas.setOpacity(1);

    }

    else if(zoom >= 17){

        camadaNomesRuas.setOpacity(.55);

    }

    else{

        camadaNomesRuas.setOpacity(0);

    }

    /*
    -----------------------------------------------------
    NOMES DOS BAIRROS
    -----------------------------------------------------
    */

    if(zoom >= 20){

        camadaNomesBairros.setOpacity(0);

    }

    else if(zoom >= 18){

        camadaNomesBairros.setOpacity(1);

    }

    else if(zoom >= 17){

        camadaNomesBairros.setOpacity(.70);

    }

    else{

        camadaNomesBairros.setOpacity(0);

    }

}
/*
=========================================================
ATIVAR PERGAMINHO
=========================================================
*/

async function ativarModoPergaminho(){

    mapaIlustrado = true;

    mapa.setMaxZoom(

        CONFIG.zoomMaximoPergaminho

    );

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

    mapa.setMaxZoom(

        CONFIG.zoomMaximoSatelite

    );

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
    NOMES DOS BAIRROS
    ---------------------------------------------------------
    */

    if(

        zoom >= 17 &&

        zoom < 19.75

    ){

        adicionarCamada(

            camadaNomesBairros

        );

    }

    else{

        removerCamada(

            camadaNomesBairros

        );

    }

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

        camadaFundo

    );

    await esperar(15);

    adicionarCamada(

        camadaMapa

    );

    await esperar(15);

    adicionarCamada(

        camadaNomesRuas

    );

    adicionarCamada(

        camadaNomesBairros

    );

    atualizarOpacidade();

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

    return mapa

        ? mapa.getZoom()

        : CONFIG.zoomInicial;

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

        zoom

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
LIMITES
=========================================================
*/

function obterLimitesMapa(){

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
REDIMENSIONAR
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
