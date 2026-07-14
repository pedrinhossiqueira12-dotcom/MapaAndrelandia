/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
app.js
Versão 1.0
=========================================================
*/

/*
=========================================================
CONFIGURAÇÕES
=========================================================
*/

const CONFIG = {

    cidade: "Andrelândia",

    estado: "MG",

    centro: [-21.74135, -44.30920],

    zoomInicial: 16,

    zoomMinimo: 14,

    zoomMaximo: 20,

    animacao: 0.6,

    caminhos: {

        locais: "data/locais.json",

        comercios: "data/comercios.json",

        hud: "img/interface/hud.svg",

        overlay: "img/overlay/",

        icones: "img/icones/"

    }

};

/*
=========================================================
VARIÁVEIS GLOBAIS
=========================================================
*/

let mapa = null;

let camadaSatelite = null;

let camadaRuas = null;

let camadaVegetacao = null;

let camadaRios = null;

let camadaDesenhos = null;

let marcadorUsuario = null;

let circuloPrecisao = null;

let marcadores = [];

let locais = [];

let comercios = [];

let pesquisaAberta = false;

let menuAberto = false;

/*
=========================================================
ELEMENTOS
=========================================================
*/

const btnMenu = document.getElementById("btnMenu");

const btnSearch = document.getElementById("btnSearch");

const btnLocate = document.getElementById("btnLocate");

const btnLayers = document.getElementById("btnLayers");

const btnSatellite = document.getElementById("btnSatellite");

const btnCloseSidebar = document.getElementById("btnCloseSidebar");

const sidebar = document.getElementById("sidebar");

const overlay = document.getElementById("overlay");

const searchContainer = document.getElementById("searchContainer");

const searchInput = document.getElementById("searchInput");

/*
=========================================================
INICIALIZAÇÃO
=========================================================
*/

document.addEventListener("DOMContentLoaded", iniciarSistema);

/*
=========================================================
INICIAR
=========================================================
*/

async function iniciarSistema(){

    console.log("========================================");
    console.log("MAPA INTERATIVO DE ANDRELÂNDIA");
    console.log("Versão 1.0");
    console.log("========================================");

    await carregarDados();

    if(typeof iniciarMapa === "function"){

        iniciarMapa();

    }

    if(typeof iniciarInterface === "function"){

        iniciarInterface();

    }

    if(typeof iniciarPesquisa === "function"){

        iniciarPesquisa();

    }

    if(typeof iniciarFiltros === "function"){

        iniciarFiltros();

    }

    if(typeof iniciarCamadas === "function"){

        iniciarCamadas();

    }

    if(typeof iniciarGPS === "function"){

        iniciarGPS();

    }

    if(typeof iniciarMarcadores === "function"){

        iniciarMarcadores();

    }

}

/*
=========================================================
CARREGAR JSON
=========================================================
*/

async function carregarDados(){

    try{

        const respostaLocais =
            await fetch(CONFIG.caminhos.locais);

        if(respostaLocais.ok){

            locais = await respostaLocais.json();

        }

    }catch(erro){

        console.warn("locais.json não encontrado.");

    }

    try{

        const respostaComercios =
            await fetch(CONFIG.caminhos.comercios);

        if(respostaComercios.ok){

            comercios = await respostaComercios.json();

        }

    }catch(erro){

        console.warn("comercios.json não encontrado.");

    }

    console.log("Locais:", locais.length);

    console.log("Comércios:", comercios.length);

}

/*
=========================================================
UTILITÁRIOS
=========================================================
*/

function abrirSidebar(){

    menuAberto = true;

    sidebar.classList.add("open");

    overlay.classList.add("show");

}

function fecharSidebar(){

    menuAberto = false;

    sidebar.classList.remove("open");

    overlay.classList.remove("show");

}

function alternarSidebar(){

    menuAberto
        ? fecharSidebar()
        : abrirSidebar();

}

function abrirPesquisa(){

    pesquisaAberta = true;

    searchContainer.classList.add("open");

    setTimeout(()=>{

        searchInput.focus();

    },200);

}

function fecharPesquisa(){

    pesquisaAberta = false;

    searchContainer.classList.remove("open");

    searchInput.value = "";

}

function alternarPesquisa(){

    pesquisaAberta
        ? fecharPesquisa()
        : abrirPesquisa();

}
