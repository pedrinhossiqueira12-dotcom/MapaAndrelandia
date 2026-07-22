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

    zoomInicial: 16,

    zoomMinimo: 16,

    zoomMaximoPergaminho: 20,

    zoomMaximoSatelite: 20,

    animacao: 0.40,

    /*
    =====================================================
    LIMITES REAIS DO MAPA
    (EPSG:3857 convertido pelo Leaflet)
    =====================================================
    */

    limites: L.latLngBounds(

        L.CRS.EPSG3857.unproject(
            L.point(
                -4948316.5800,
                -2489080.6150
            )
        ),

        L.CRS.EPSG3857.unproject(
            L.point(
                -4923006.5972,
                -2473277.5588
            )
        )

    ),

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
LIMITES DO OVERLAY
=========================================================
*/

const LIMITES_OVERLAY = CONFIG.limites;
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

            fadeAnimation:false,

            zoomAnimation:true,

            markerZoomAnimation:false,

            inertia:true,

            inertiaDeceleration:2500,

            inertiaMaxSpeed:1200,

            minZoom:CONFIG.zoomMinimo,

            maxZoom:CONFIG.zoomMaximoPergaminho,

            maxBounds:CONFIG.limites,

            maxBoundsViscosity:1,

            zoomSnap:0.25,

            zoomDelta:0.25,

            worldCopyJump:false,

            maxBoundsViscosity:1

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
CAMADA FUNDO
=========================================================
*/

function criarCamadaFundo(){

    camadaFundo = L.imageOverlay(

        CONFIG.caminhos.mapa + "fundo.png",

        LIMITES_OVERLAY,

        {

            pane:"fundo",

            opacity:1,

            interactive:false,

            crossOrigin:true

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

        CONFIG.caminhos.mapa + "mapa.svg",

        LIMITES_OVERLAY,

        {

            pane:"mapa",

            opacity:1,

            interactive:false,

            crossOrigin:true

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

        CONFIG.caminhos.mapa + "nomes-ruas.svg",

        LIMITES_OVERLAY,

        {

            pane:"nomesRuas",

            opacity:1,

            interactive:false,

            crossOrigin:true

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

        CONFIG.caminhos.mapa + "nomes-bairros.svg",

        LIMITES_OVERLAY,

        {

            pane:"nomesBairros",

            opacity:1,

            interactive:false,

            crossOrigin:true

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

    criarCamadaFundo();

    criarCamadaMapa();

    criarCamadaNomesRuas();

    criarCamadaNomesBairros();

    otimizarCamadas();

    await ativarModoPergaminho();

}

/*
=========================================================
OTIMIZAÇÃO DAS CAMADAS
=========================================================
*/

function otimizarCamadas(){

    [

        camadaFundo,

        camadaMapa,

        camadaNomesRuas,

        camadaNomesBairros

    ].forEach(camada=>{

        if(!camada) return;

        camada.on("add",()=>{

            const elemento = camada.getElement();

            if(!elemento) return;

            elemento.style.pointerEvents="none";

            elemento.style.userSelect="none";

            elemento.style.transformOrigin="center center";

            elemento.style.backfaceVisibility="hidden";

            elemento.style.willChange="transform";

        });

    });

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

        camada.addTo(mapa);

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
CARREGAR PERGAMINHO
=========================================================
*/

async function carregarPergaminho(){

    removerCamada(camadaSatelite);

    adicionarCamada(camadaFundo);

    await esperar(10);

    adicionarCamada(camadaMapa);

    atualizarOpacidade();

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
ATIVAR PERGAMINHO
=========================================================
*/

async function ativarModoPergaminho(){

    mapaIlustrado=true;

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

    mapaIlustrado=false;

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

    if(!mapaIlustrado) return;

    const zoom = mapa.getZoom();

    /*
    RUAS
    */

    if(zoom>=17.75){

        adicionarCamada(camadaNomesRuas);

    }else{

        removerCamada(camadaNomesRuas);

    }

    /*
    BAIRROS
    */

    if(

        zoom>=17 &&

        zoom<19.75

    ){

        adicionarCamada(camadaNomesBairros);

    }else{

        removerCamada(camadaNomesBairros);

    }

}

/*
=========================================================
EVENTOS DO MAPA
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

        return CONFIG.limites;

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

window.mapaAPI={

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
INICIALIZAÇÃO DOS EVENTOS
=========================================================
*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        if(mapa){

            registrarEventosMapa();

        }

    }

);

/*
=========================================================
FIM
=========================================================
*/
