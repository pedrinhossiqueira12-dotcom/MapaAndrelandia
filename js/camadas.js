/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
camadas.js
Versão 5.0
=========================================================
*/

/*
=========================================================
MODOS
=========================================================
*/

const MODO_PERGAMINHO = "pergaminho";

const MODO_SATELITE = "satelite";

let modoMapa = MODO_PERGAMINHO;

/*
=========================================================
INICIAR
=========================================================
*/

function iniciarCamadas(){

    const botao = document.getElementById("btnSatellite");

    if(botao){

        botao.addEventListener(

            "click",

            alternarModoMapa

        );

    }

    aplicarModoMapa();

}

/*
=========================================================
ALTERNAR
=========================================================
*/

function alternarModoMapa(){

    modoMapa =

        modoMapa===MODO_PERGAMINHO

        ? MODO_SATELITE

        : MODO_PERGAMINHO;

    aplicarModoMapa();

}

/*
=========================================================
APLICAR
=========================================================
*/

function aplicarModoMapa(){

    if(!mapa){

        return;

    }

    if(modoMapa===MODO_PERGAMINHO){

        ativarPergaminho();

    }

    else{

        ativarSatelite();

    }

    atualizarBotaoCamadas();

}

/*
=========================================================
PERGAMINHO
=========================================================
*/

function ativarPergaminho(){

    document.body.classList.add(

        "modo-pergaminho"

    );

    document.body.classList.remove(

        "modo-satelite"

    );

    removerCamada(camadaSatelite);

    adicionarCamada(camadaFundo);

    adicionarCamada(camadaMapa);

    atualizarOpacidade();

}

/*
=========================================================
SATÉLITE
=========================================================
*/

function ativarSatelite(){

    document.body.classList.remove(

        "modo-pergaminho"

    );

    document.body.classList.add(

        "modo-satelite"

    );

    removerCamada(camadaFundo);

    removerCamada(camadaMapa);

    removerCamada(camadaNomesRuas);

    removerCamada(camadaNomesBairros);

    adicionarCamada(camadaSatelite);

}

/*
=========================================================
BOTÃO
=========================================================
*/

function atualizarBotaoCamadas(){

    const botao = document.getElementById(

        "btnSatellite"

    );

    if(!botao){

        return;

    }

    botao.title =

        modoMapa===MODO_PERGAMINHO

        ? "Modo Satélite"

        : "Modo Pergaminho";

}

/*
=========================================================
UTILITÁRIOS
=========================================================
*/

function mapaEstaEmPergaminho(){

    return modoMapa===MODO_PERGAMINHO;

}

function mapaEstaEmSatelite(){

    return modoMapa===MODO_SATELITE;

}

function obterModoMapa(){

    return modoMapa;

}

function definirModo(modo){

    if(

        modo!==MODO_PERGAMINHO &&

        modo!==MODO_SATELITE

    ){

        return;

    }

    modoMapa = modo;

    aplicarModoMapa();

}

/*
=========================================================
API
=========================================================
*/

window.camadasAPI={

    alternarModoMapa,

    definirModo,

    obterModoMapa,

    mapaEstaEmPergaminho,

    mapaEstaEmSatelite

};

/*
=========================================================
FIM
=========================================================
*/
