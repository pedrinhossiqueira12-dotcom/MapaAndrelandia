/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
camadas.js
Versão 2.0
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

    atualizarModoMapa();

    if(btnSatellite){

        btnSatellite.addEventListener(

            "click",

            alternarModoMapa

        );

    }

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

    atualizarModoMapa();

}

/*
=========================================================
ATUALIZAR
=========================================================
*/

function atualizarModoMapa(){

    if(!mapa){

        return;

    }

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

    if(camadaSatelite){

        mapa.removeLayer(

            camadaSatelite

        );

    }

    mostrarSVGMapa();

    if(typeof atualizarTextura==="function"){

        atualizarTextura();

    }

    if(btnSatellite){

        btnSatellite.title = "Modo Satélite";

    }

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

    if(camadaSatelite){

        camadaSatelite.addTo(

            mapa

        );

    }

    ocultarSVGMapa();

    if(btnSatellite){

        btnSatellite.title = "Modo Pergaminho";

    }

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

    camadasSVG.forEach(

        camada=>{

            if(

                camada &&

                !mapa.hasLayer(camada)

            ){

                camada.addTo(

                    mapa

                );

            }

        }

    );

}

function ocultarSVGMapa(){

    if(!camadasSVG){

        return;

    }

    camadasSVG.forEach(

        camada=>{

            if(

                camada &&

                mapa.hasLayer(camada)

            ){

                mapa.removeLayer(

                    camada

                );

            }

        }

    );

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
