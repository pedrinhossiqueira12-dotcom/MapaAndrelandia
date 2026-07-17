/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
app.js
Versão 3.0
=========================================================
*/

/*
=========================================================
DADOS
=========================================================
*/

let locais = [];

let comercios = [];

/*
=========================================================
ESTADO DA INTERFACE
=========================================================
*/

let pesquisaAberta = false;

let menuAberto = false;

/*
=========================================================
ELEMENTOS
=========================================================
*/

let btnMenu;

let btnPesquisar;

let btnGPS;

let btnSatellite;

let btnFecharMenu;

let menuLateral;

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

async function iniciarSistema(){

    obterElementos();

    await carregarDados();

    iniciarMapa();

    iniciarCamadas();

    iniciarMarcadores();

    iniciarGPS();

    iniciarPesquisa();

    iniciarFiltros();

    iniciarInterface();

    if(typeof iniciarPopup==="function"){

        iniciarPopup();

    }

}
/*
=========================================================
OBTER ELEMENTOS
=========================================================
*/

function obterElementos(){

    btnMenu = document.getElementById(

        "btnMenu"

    );

    btnPesquisar = document.getElementById(

        "btnPesquisar"

    );

    btnGPS = document.getElementById(

        "btnGPS"

    );

    btnSatellite = document.getElementById(

        "btnSatellite"

    );

    btnFecharMenu = document.getElementById(

        "fecharMenu"

    );

    menuLateral = document.getElementById(

        "menuLateral"

    );

    overlay = document.getElementById(

        "overlay"

    );

    searchContainer = document.getElementById(

        "searchContainer"

    );

    searchInput = document.getElementById(

        "searchInput"

    );

}

/*
=========================================================
CARREGAR DADOS
=========================================================
*/

async function carregarDados(){

    try{

        const resposta = await fetch(

            "data/locais.json"

        );

        if(

            !resposta.ok

        ){

            throw new Error(

                "locais.json"

            );

        }

        locais = await resposta.json();

    }catch(e){

        console.error(

            "Erro ao carregar locais:",

            e

        );

        locais = [];

    }

    try{

        const resposta = await fetch(

            "data/comercios.json"

        );

        if(

            !resposta.ok

        ){

            throw new Error(

                "comercios.json"

            );

        }

        comercios = await resposta.json();

    }catch(e){

        console.error(

            "Erro ao carregar comércios:",

            e

        );

        comercios = [];

    }

}
/*
=========================================================
MENU LATERAL
=========================================================
*/

function abrirMenu(){

    if(!menuLateral){

        return;

    }

    menuAberto = true;

    menuLateral.classList.add(

        "aberto"

    );

}

function fecharMenu(){

    if(!menuLateral){

        return;

    }

    menuAberto = false;

    menuLateral.classList.remove(

        "aberto"

    );

}

function alternarMenu(){

    menuAberto

        ? fecharMenu()

        : abrirMenu();

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

    searchContainer.classList.add(

        "aberto"

    );

    if(searchInput){

        setTimeout(

            ()=>{

                searchInput.focus();

            },

            200

        );

    }

}

function fecharPesquisa(){

    if(!searchContainer){

        return;

    }

    pesquisaAberta = false;

    searchContainer.classList.remove(

        "aberto"

    );

    if(searchInput){

        searchInput.value = "";

    }

    if(

        typeof limparResultados ===

        "function"

    ){

        limparResultados();

    }

}

function alternarPesquisa(){

    pesquisaAberta

        ? fecharPesquisa()

        : abrirPesquisa();

}
/*
=========================================================
EVENTOS
=========================================================
*/

function iniciarInterface(){

    if(btnMenu){

        btnMenu.addEventListener(

            "click",

            alternarMenu

        );

    }

    if(btnFecharMenu){

        btnFecharMenu.addEventListener(

            "click",

            fecharMenu

        );

    }

    if(btnPesquisar){

        btnPesquisar.addEventListener(

            "click",

            alternarPesquisa

        );

    }

    if(btnGPS){

        btnGPS.addEventListener(

            "click",

            ()=>{

                if(

                    typeof centralizarUsuario ===

                    "function"

                ){

                    centralizarUsuario();

                }

            }

        );

    }

}

/*
=========================================================
UTILITÁRIOS
=========================================================
*/

function sistemaPronto(){

    return (

        mapa !== null

    );

}

function obterLocais(){

    return locais;

}

function obterComercios(){

    return comercios;

}

/*
=========================================================
API
=========================================================
*/

window.appAPI={

    obterLocais,

    obterComercios,

    abrirMenu,

    fecharMenu,

    alternarMenu,

    abrirPesquisa,

    fecharPesquisa,

    alternarPesquisa,

    sistemaPronto

};

/*
=========================================================
FIM
=========================================================
*/
