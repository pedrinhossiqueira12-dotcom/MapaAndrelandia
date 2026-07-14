/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
camadas.js
Versão 1.0
=========================================================
*/

/*
=========================================================
MODO DO MAPA
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

    atualizarModoMapa();

    configurarBotaoCamadas();

}

/*
=========================================================
BOTÃO
=========================================================
*/

function configurarBotaoCamadas(){

    if(!btnSatellite){

        return;

    }

    btnSatellite.addEventListener(

        "click",

        alternarModoMapa

    );

}
/*
=========================================================
ALTERNAR
=========================================================
*/

function alternarModoMapa(){

    if(modoMapa===MODO_PERGAMINHO){

        modoMapa=MODO_SATELITE;

    }else{

        modoMapa=MODO_PERGAMINHO;

    }

    atualizarModoMapa();

}

/*
=========================================================
ATUALIZAR
=========================================================
*/

function atualizarModoMapa(){

    if(modoMapa===MODO_PERGAMINHO){

        ativarPergaminho();

    }else{

        ativarSatelite();

    }

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

    if(btnSatellite){

        btnSatellite.title="Modo Satélite";

    }

    mostrarSVGMapa();

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

    if(btnSatellite){

        btnSatellite.title="Modo Pergaminho";

    }

    ocultarSVGMapa();

}
/*
=========================================================
SVG
=========================================================
*/

function mostrarSVGMapa(){

    if(!camadasSVG){

        return;

    }

    camadasSVG.forEach(camada=>{

        if(camada && !mapa.hasLayer(camada)){

            camada.addTo(mapa);

        }

    });

}

function ocultarSVGMapa(){

    if(!camadasSVG){

        return;

    }

    camadasSVG.forEach(camada=>{

        if(camada && mapa.hasLayer(camada)){

            mapa.removeLayer(camada);

        }

    });

}
