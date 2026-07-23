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

const CONFIG = {

    /*
    ---------------------------------------------------------
    LIMITES EXPORTADOS DO QGIS (EPSG:4326)
    ---------------------------------------------------------
    */

    limites:[

        [

            -21.681117919,

            -44.451251788

        ],

        [

            -21.812963565,

            -44.224268434

        ]

    ],

    /*
    ---------------------------------------------------------
    CENTRO CALCULADO DOS LIMITES
    ---------------------------------------------------------
    */

    centro:[

        (-21.681117919 + -21.812963565) / 2,

        (-44.451251788 + -44.224268434) / 2

    ],

    zoomInicial:16,

    zoomMinimo:16,

    zoomMaximoPergaminho:20,

    zoomMaximoSatelite:18,

    animacao:.40,

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
TODOS OS OVERLAYS USAM O MESMO LIMITE
=========================================================
*/

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

            inertia:true,

            inertiaDeceleration:2500,

            inertiaMaxSpeed:1200

        }

    );

    /*
    ---------------------------------------------------------
    CENTRALIZA PELO CENTRO REAL DO MAPA
    ---------------------------------------------------------
    */

    mapa.setView(

        CONFIG.centro,

        CONFIG.zoomInicial

    );

    /*
    ---------------------------------------------------------
    AJUSTA O MAPA AO TAMANHO DA IMAGEM EXPORTADA
    ---------------------------------------------------------
    */

    mapa.fitBounds(

        CONFIG.limites,

        {

            animate:false,

            padding:[0,0]

        }

    );

    /*
    ---------------------------------------------------------
    IMPEDE SAIR DA ÁREA EXPORTADA
    ---------------------------------------------------------
    */

    mapa.panInsideBounds(

        CONFIG.limites,

        {

            animate:false

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

    /*
    ---------------------------------------------------------
    OTIMIZAÇÃO DAS PANES
    ---------------------------------------------------------
    */

    [

        "fundo",

        "mapa",

        "nomesRuas",

        "nomesBairros"

    ].forEach(nome=>{

        const pane = mapa.getPane(nome);

        pane.style.pointerEvents = "none";
        pane.style.userSelect = "none";
        pane.style.willChange = "transform";
        pane.style.transformOrigin = "center center";
        pane.style.backfaceVisibility = "hidden";
        pane.style.contain = "layout style paint";

    });

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

            elemento.style.pointerEvents = "none";
            elemento.style.userSelect = "none";
            elemento.style.willChange = "transform";
            elemento.style.transformOrigin = "center center";
            elemento.style.backfaceVisibility = "hidden";

            /*
            -----------------------------------------------------
            PNG COM MELHOR QUALIDADE
            -----------------------------------------------------
            */

            if(elemento.tagName==="IMG"){

                elemento.draggable = false;
                elemento.style.maxWidth = "none";
                elemento.style.maxHeight = "none";
                elemento.style.imageRendering = "auto";

            }

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

            crossOrigin:true,

            keepBuffer:4,

            updateWhenIdle:true,

            updateWhenZooming:false,

            reuseTiles:true,

            noWrap:true,

            detectRetina:true,

            unloadInvisibleTiles:true

        }

    );

}

/*
=========================================================
PRÉ CARREGAR IMAGENS
=========================================================
*/

function preloadImagens(){

    [

        "fundo.png",

        "mapa.svg",

        "nomes-ruas.svg",

        "nomes-bairros.svg"

    ].forEach(arquivo=>{

        const img = new Image();

        img.decoding = "async";

        img.loading = "eager";

        img.src = CONFIG.caminhos.mapa + arquivo;

    });

}

/*
=========================================================
FUNDO
=========================================================
*/

function criarCamadaFundo(){

    camadaFundo = L.imageOverlay(

        CONFIG.caminhos.mapa + "fundo.png",

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
MAPA
=========================================================
*/

function criarCamadaMapa(){

    camadaMapa = L.imageOverlay(

        CONFIG.caminhos.mapa + "mapa.svg",

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
NOMES DAS RUAS
=========================================================
*/

function criarCamadaNomesRuas(){

    camadaNomesRuas = L.imageOverlay(

        CONFIG.caminhos.mapa + "nomes-ruas.svg",

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
NOMES DOS BAIRROS
=========================================================
*/

function criarCamadaNomesBairros(){

    camadaNomesBairros = L.imageOverlay(

        CONFIG.caminhos.mapa + "nomes-bairros.svg",

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

        !camada ||

        mapa.hasLayer(camada)

    ){

        return;

    }

    camada.addTo(mapa);

}

/*
=========================================================
REMOVER CAMADA
=========================================================
*/

function removerCamada(camada){

    if(

        !camada ||

        !mapa.hasLayer(camada)

    ){

        return;

    }

    mapa.removeLayer(camada);

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

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

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

    await esperar(10);

    adicionarCamada(

        camadaMapa

    );

    atualizarOpacidade();

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
ATIVAR PERGAMINHO
=========================================================
*/

async function ativarModoPergaminho(){

    mapaIlustrado = true;

    mapa.setMaxZoom(

        CONFIG.zoomMaximoPergaminho

    );

    await carregarPergaminho();

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
ATUALIZAR VISIBILIDADE
=========================================================
*/

function atualizarOpacidade(){

    if(

        !mapa ||

        !mapaIlustrado

    ){

        return;

    }

    const zoom = mapa.getZoom();

    /*
    ---------------------------------------------------------
    NOMES DAS RUAS
    ---------------------------------------------------------
    */

    if(zoom >= 17.75){

        adicionarCamada(

            camadaNomesRuas

        );

    }

    else{

        removerCamada(

            camadaNomesRuas

        );

    }

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
EVENTO DE ZOOM
=========================================================
*/

function registrarEventosMapa(){

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

    mapa.setZoom(zoom);

}

/*
=========================================================
CENTRALIZAR MAPA
=========================================================
*/

function centralizarMapa(

    latitude,

    longitude,

    zoom = obterZoom()

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

            animate:false,

            pan:false

        }

    );

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
CARREGAMENTO COMPLETO
=========================================================
*/

mapaQuandoPronto();

async function mapaQuandoPronto(){

    if(!mapa){

        return;

    }

    await esperar(30);

    atualizarMapa();

    atualizarOpacidade();

}

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
