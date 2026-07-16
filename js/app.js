/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
app.js
Versão 2.0
=========================================================
*/

/*
=========================================================
CONFIGURAÇÕES
=========================================================
*/

const CONFIG = {

    cidade:"Andrelândia",

    estado:"MG",

    centro:[-21.74135,-44.30920],

    zoomInicial:16,

    zoomMinimo:14,

    zoomMaximo:20,

    animacao:0.6,

    caminhos:{

        locais:"data/locais.json",

        comercios:"data/comercios.json",

        hud:"img/interface/hud.svg",

        overlay:"img/overlay/",

        icones:"img/icones/"

    }

};

/*
=========================================================
VARIÁVEIS
=========================================================
*/

let mapa = null;

let camadaSatelite = null;

let camadaRuas = null;

let camadasSVG = [];

let mapaIlustrado = true;

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

let btnMenu;

let btnSearch;

let btnLocate;

let btnLayers;

let btnSatellite;

let btnCloseSidebar;

let sidebar;

let overlay;

let searchContainer;

let searchInput;

/*
=========================================================
INICIALIZAÇÃO
=========================================================
*/

document.addEventListener(

    "DOMContentLoaded",

    iniciarSistema

);

/*
=========================================================
INICIAR
=========================================================
*/

async function iniciarSistema(){

    obterElementos();

    await carregarDados();

    if(typeof iniciarMapa==="function"){

        iniciarMapa();

    }

    if(typeof iniciarInterface==="function"){

        iniciarInterface();

    }

    if(typeof iniciarPesquisa==="function"){

        iniciarPesquisa();

    }

    if(typeof iniciarFiltros==="function"){

        iniciarFiltros();

    }

    if(typeof iniciarCamadas==="function"){

        iniciarCamadas();

    }

    if(typeof iniciarGPS==="function"){

        iniciarGPS();

    }

    if(typeof iniciarMarcadores==="function"){

        iniciarMarcadores();

    }
    if(typeof iniciarPopup==="function"){

    iniciarPopup();

    }

}

/*
=========================================================
ELEMENTOS
=========================================================
*/

function obterElementos(){

    btnMenu = document.getElementById("btnMenu");

    btnSearch = document.getElementById("btnPesquisar");

    btnLocate = document.getElementById("btnGPS");

    btnSatellite = document.getElementById("btnSatellite");

    btnCloseSidebar = document.getElementById("fecharMenu");

    sidebar = document.getElementById("menuLateral");

    overlay = document.getElementById("overlay");

    searchContainer = document.getElementById("searchContainer");

    searchInput = document.getElementById("searchInput");

}

/*
=========================================================
CARREGAR JSON
=========================================================
*/

async function carregarDados(){

    try{

        const resposta = await fetch(CONFIG.caminhos.locais);

        if(resposta.ok){

            locais = await resposta.json();

        }

    }catch(e){

        console.warn("Erro ao carregar locais.json", e);

    }

    try{

        const resposta = await fetch(CONFIG.caminhos.comercios);

        if(resposta.ok){

            comercios = await resposta.json();

        }

    }catch(e){

        console.warn("Erro ao carregar comercios.json");

    }

}

/*
=========================================================
MENU
=========================================================
*/

function abrirSidebar(){

    if(!sidebar){

        return;

    }

    menuAberto = true;

    sidebar.classList.add("open");

    if(overlay){

        overlay.classList.add("show");

    }

}

function fecharSidebar(){

    if(!sidebar){

        return;

    }

    menuAberto = false;

    sidebar.classList.remove("open");

    if(overlay){

        overlay.classList.remove("show");

    }

}

function alternarSidebar(){

    menuAberto

        ? fecharSidebar()

        : abrirSidebar();

}

/*
=========================================================
PESQUISA
=========================================================
*/

function abrirPesquisa(){

    if(!searchContainer){

        return;

    }

    pesquisaAberta = true;

    searchContainer.classList.add("open");

    if(searchInput){

        setTimeout(

            ()=>searchInput.focus(),

            200

        );

    }

}

function fecharPesquisa(){

    if(!searchContainer){

        return;

    }

    pesquisaAberta = false;

    searchContainer.classList.remove("open");

    if(searchInput){

        searchInput.value = "";

    }

    if(typeof limparResultados === "function"){

        limparResultados();

    }

}

function alternarPesquisa(){

    pesquisaAberta

        ? fecharPesquisa()

        : abrirPesquisa();

}
