/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
camadas.js
Versão 4.0
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

    const botao = document.getElementById(

        "btnSatellite"

    );

    if(!botao){

        return;

    }

    botao.addEventListener(

        "click",

        alternarModoMapa

    );

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
APLICAR MODO
=========================================================
*/

function aplicarModoMapa(){

    if(!mapa){

        return;

    }

    if(modoMapa===MODO_PERGAMINHO){

        ativarPergaminho();

    }else{

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

    if(

        mapa.hasLayer(

            camadaSatelite

        )

    ){

        mapa.removeLayer(

            camadaSatelite

        );

    }

    adicionarCamada(

        camadaPapel

    );

    adicionarCamada(

        camadaBairros

    );

    adicionarCamada(

        camadaVegetacao

    );

    adicionarCamada(

        camadaMapa

    );

    adicionarCamada(

        camadaNomesRuas

    );

    adicionarCamada(

        camadaNomesBairros

    );

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

    removerCamada(

        camadaPapel

    );

    removerCamada(

        camadaBairros

    );

    removerCamada(

        camadaVegetacao

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

    if(

        !mapa.hasLayer(

            camadaSatelite

        )

    ){

        camadaSatelite.addTo(

            mapa

        );

    }

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

/*
=========================================================
DEFINIR MODO
=========================================================
*/

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
