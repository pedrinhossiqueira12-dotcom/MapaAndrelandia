/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
mapa.js
Versão 5.0
=========================================================
*/

/*
=========================================================
VARIÁVEIS
=========================================================
*/

let mapa;

let camadaSatelite;

let camadaPapel;

let camadaBairros;

let camadaVegetacao;

let camadaMapa;

let camadaNomesRuas;

let camadaNomesBairros;

let marcadorUsuario;

let circuloPrecisao;

let grupoMarcadores;

let marcadores = [];

/*
=========================================================
CONFIGURAÇÃO
=========================================================
*/

const CONFIG={

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

const LIMITES_OVERLAY = CONFIG.limites;
/*
=========================================================
INICIAR MAPA
=========================================================
*/

async function iniciarMapa(){

    criarMapa();

    criarPanes();

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
PANES
=========================================================
*/

function criarPanes(){

    mapa.createPane(

        "papel"

    );

    mapa.createPane(

        "bairros"

    );

    mapa.createPane(

        "vegetacao"

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

        "papel"

    ).style.zIndex = 210;

    mapa.getPane(

        "bairros"

    ).style.zIndex = 220;

    mapa.getPane(

        "vegetacao"

    ).style.zIndex = 230;

    mapa.getPane(

        "mapa"

    ).style.zIndex = 240;

    mapa.getPane(

        "nomesRuas"

    ).style.zIndex = 250;

    mapa.getPane(

        "nomesBairros"

    ).style.zIndex = 260;

}

/*
=========================================================
GRID LAYER - PAPEL
=========================================================
*/

const CamadaPapel = L.GridLayer.extend({

    createTile:function(){

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
PAPEL
=========================================================
*/

function criarCamadaPapel(){

    camadaPapel = new CamadaPapel({

        pane:"papel",

        tileSize:512,

        keepBuffer:3,

        updateWhenIdle:true,

        updateWhenZooming:true,

        noWrap:true

    });

    camadaPapel.addTo(

        mapa

    );

}

/*
=========================================================
CRIAR CAMADAS
=========================================================
*/

async function criarCamadas(){

    criarCamadaSatelite();

    criarCamadaPapel();

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

    if(mapa.hasLayer(camadaSatelite)){

        mapa.removeLayer(

            camadaSatelite

        );

    }

    camadaMapa.addTo(

        mapa

    );

    await esperar(40);

    camadaPapel.addTo(

        mapa

    );

    await esperar(40);

    camadaVegetacao.addTo(

        mapa

    );

    await esperar(40);

    camadaBairros.addTo(

        mapa

    );

    await esperar(40);

    camadaNomesRuas.addTo(

        mapa

    );

    await esperar(40);

    camadaNomesBairros.addTo(

        mapa

    );

}
/*
=========================================================
CARREGAR SATÉLITE
=========================================================
*/

async function carregarSatelite(){

    removerCamadasIlustradas();

    if(!mapa.hasLayer(camadaSatelite)){

        camadaSatelite.addTo(

            mapa

        );

    }

}
/*
=========================================================
CARREGAMENTO PROGRESSIVO
=========================================================
*/

async function carregarCamadasProgressivamente(){

    removerCamadasIlustradas();

    camadaMapa.addTo(

        mapa

    );

    await esperar(80);

    camadaPapel.addTo(

        mapa

    );

    await esperar(80);

    camadaVegetacao.addTo(

        mapa

    );

    await esperar(80);

    camadaBairros.addTo(

        mapa

    );

    await esperar(80);

    camadaNomesRuas.addTo(

        mapa

    );

    await esperar(80);

    camadaNomesBairros.addTo(

        mapa

    );

}
/*
=========================================================
ADICIONAR CAMADAS ILUSTRADAS
=========================================================
*/

function adicionarCamadasIlustradas(){

    if(!mapa.hasLayer(camadaPapel))
        camadaPapel.addTo(mapa);

    if(!mapa.hasLayer(camadaBairros))
        camadaBairros.addTo(mapa);

    if(!mapa.hasLayer(camadaVegetacao))
        camadaVegetacao.addTo(mapa);

    if(!mapa.hasLayer(camadaMapa))
        camadaMapa.addTo(mapa);

    if(!mapa.hasLayer(camadaNomesRuas))
        camadaNomesRuas.addTo(mapa);

    if(!mapa.hasLayer(camadaNomesBairros))
        camadaNomesBairros.addTo(mapa);

}

/*
=========================================================
REMOVER CAMADAS ILUSTRADAS
=========================================================
*/

function removerCamadasIlustradas(){

    if(mapa.hasLayer(camadaPapel))
        mapa.removeLayer(camadaPapel);

    if(mapa.hasLayer(camadaBairros))
        mapa.removeLayer(camadaBairros);

    if(mapa.hasLayer(camadaVegetacao))
        mapa.removeLayer(camadaVegetacao);

    if(mapa.hasLayer(camadaMapa))
        mapa.removeLayer(camadaMapa);

    if(mapa.hasLayer(camadaNomesRuas))
        mapa.removeLayer(camadaNomesRuas);

    if(mapa.hasLayer(camadaNomesBairros))
        mapa.removeLayer(camadaNomesBairros);

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

            crossOrigin:true,

            keepBuffer:2,

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
BAIRROS
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

        CONFIG.caminhos.mapa +

        "vegetacao.svg",

        LIMITES_OVERLAY,

        {

            pane:"vegetacao",

            opacity:CONFIG.opacidade.vegetacao,

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

        CONFIG.caminhos.mapa +

        "mapa.svg",

        LIMITES_OVERLAY,

        {

            pane:"mapa",

            opacity:CONFIG.opacidade.mapa,

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

        CONFIG.caminhos.mapa +

        "nomes-ruas.svg",

        LIMITES_OVERLAY,

        {

            pane:"nomesRuas",

            opacity:CONFIG.opacidade.nomesRuas,

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

        CONFIG.caminhos.mapa +

        "nomes-bairros.svg",

        LIMITES_OVERLAY,

        {

            pane:"nomesBairros",

            opacity:CONFIG.opacidade.nomesBairros,

            interactive:false

        }

    );

    camadaNomesBairros.addTo(

        mapa

    );

}
/*
=========================================================
MOSTRAR CAMADAS ILUSTRADAS
=========================================================
*/

function mostrarCamadasIlustradas(){

    camadaPapel.setOpacity(

        CONFIG.opacidade.papel

    );

    camadaBairros.setOpacity(

        CONFIG.opacidade.bairros

    );

    camadaVegetacao.setOpacity(

        CONFIG.opacidade.vegetacao

    );

    camadaMapa.setOpacity(

        CONFIG.opacidade.mapa

    );

    camadaNomesRuas.setOpacity(

        CONFIG.opacidade.nomesRuas

    );

    camadaNomesBairros.setOpacity(

        CONFIG.opacidade.nomesBairros

    );

}

/*
=========================================================
OCULTAR CAMADAS ILUSTRADAS
=========================================================
*/

function ocultarCamadasIlustradas(){

    camadaPapel.setOpacity(0);

    camadaBairros.setOpacity(0);

    camadaVegetacao.setOpacity(0);

    camadaMapa.setOpacity(0);

    camadaNomesRuas.setOpacity(0);

    camadaNomesBairros.setOpacity(0);

}

/*
=========================================================
MODO PERGAMINHO
=========================================================
*/

async function ativarModoPergaminho(){

    mapaIlustrado = true;

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
MODO SATÉLITE
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

function alternarModoMapa(){

    if(

        mapaIlustrado

    ){

        ativarModoSatelite();

    }

    else{

        ativarModoPergaminho();

    }

}
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
