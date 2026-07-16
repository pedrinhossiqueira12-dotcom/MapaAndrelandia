/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
camadas.js
Versão 3.0
=========================================================
*/

/*
=========================================================
INICIAR
=========================================================
*/

function iniciarCamadas(){

    const botao = document.getElementById(

        "btnSatellite"

    );

    if(!botao){

        return;

    }

    botao.addEventListener(

        "click",

        ()=>{

            alternarModoMapa();

        }

    );

}

/*
=========================================================
MOSTRAR SVG
=========================================================
*/

function mostrarSVGMapa(){

    mostrarSVGs();

}

/*
=========================================================
OCULTAR SVG
=========================================================
*/

function ocultarSVGMapa(){

    esconderSVGs();

}
/*
=========================================================
UTILITÁRIOS
=========================================================
*/

function mapaEstaEmPergaminho(){

    return mapaIlustrado === true;

}

function mapaEstaEmSatelite(){

    return mapaIlustrado === false;

}

function obterModoMapa(){

    return mapaIlustrado

        ? "pergaminho"

        : "satelite";

}

/*
=========================================================
DEFINIR MODO
=========================================================
*/

function definirModo(modo){

    if(

        modo !== "pergaminho" &&

        modo !== "satelite"

    ){

        return;

    }

    definirModoMapa(

        modo === "pergaminho"

    );

}

/*
=========================================================
ATUALIZAR BOTÃO
=========================================================
*/

function atualizarBotaoCamadas(){

    const botao = document.getElementById(

        "btnSatellite"

    );

    if(!botao){

        return;

    }

    botao.title = mapaEstaEmPergaminho()

        ? "Modo Satélite"

        : "Modo Pergaminho";

}

/*
=========================================================
API
=========================================================
*/

window.camadasAPI = {

    mostrarSVGMapa,

    ocultarSVGMapa,

    mapaEstaEmPergaminho,

    mapaEstaEmSatelite,

    obterModoMapa,

    definirModo

};

/*
=========================================================
FIM
=========================================================
*/
