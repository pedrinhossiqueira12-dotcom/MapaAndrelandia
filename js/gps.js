/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
gps.js
Versão 3.0
=========================================================
*/

/*
=========================================================
VARIÁVEIS
=========================================================
*/

let ultimaLocalizacao = null;

let acompanhandoGPS = false;

let watchID = null;

/*
=========================================================
INICIAR
=========================================================
*/

function iniciarGPS(){

    if(

        !navigator.geolocation ||

        !mapa

    ){

        return;

    }

    const botao = document.getElementById(

        "btnGPS"

    );

    if(botao){

        botao.addEventListener(

            "click",

            centralizarUsuario

        );

    }

    if(

        watchID !== null

    ){

        return;

    }

    watchID = navigator.geolocation.watchPosition(

        atualizarLocalizacao,

        erroLocalizacao,

        {

            enableHighAccuracy:true,

            timeout:10000,

            maximumAge:3000

        }

    );

}

/*
=========================================================
ATUALIZAR LOCALIZAÇÃO
=========================================================
*/

function atualizarLocalizacao(posicao){

    const latitude =

        posicao.coords.latitude;

    const longitude =

        posicao.coords.longitude;

    const precisao =

        posicao.coords.accuracy;

    ultimaLocalizacao = [

        latitude,

        longitude

    ];

    atualizarMarcadorUsuario(

        latitude,

        longitude,

        precisao

    );

    if(

        acompanhandoGPS

    ){

        mapa.flyTo(

            ultimaLocalizacao,

            Math.max(

                mapa.getZoom(),

                18

            ),

            {

                animate:true,

                duration:CONFIG.animacao

            }

        );

    }

}
/*
=========================================================
MARCADOR DO USUÁRIO
=========================================================
*/

function atualizarMarcadorUsuario(

    latitude,

    longitude,

    precisao

){

    if(!mapa){

        return;

    }

    const posicao = [

        latitude,

        longitude

    ];

    if(!marcadorUsuario){

        marcadorUsuario = L.circleMarker(

            posicao,

            {

                radius:8,

                color:"#ffffff",

                weight:3,

                fillColor:"#1e88ff",

                fillOpacity:1

            }

        ).addTo(

            mapa

        );

    }else{

        marcadorUsuario.setLatLng(

            posicao

        );

    }

    if(!circuloPrecisao){

        circuloPrecisao = L.circle(

            posicao,

            {

                radius:precisao,

                color:"#1e88ff",

                weight:1,

                fillColor:"#1e88ff",

                fillOpacity:0.12

            }

        ).addTo(

            mapa

        );

    }else{

        circuloPrecisao.setLatLng(

            posicao

        );

        circuloPrecisao.setRadius(

            precisao

        );

    }

}

/*
=========================================================
CENTRALIZAR USUÁRIO
=========================================================
*/

function centralizarUsuario(){

    if(

        !ultimaLocalizacao ||

        !mapa

    ){

        return;

    }

    acompanhandoGPS = true;

    mapa.flyTo(

        ultimaLocalizacao,

        Math.max(

            mapa.getZoom(),

            18

        ),

        {

            animate:true,

            duration:CONFIG.animacao

        }

    );

}

/*
=========================================================
PARAR ACOMPANHAMENTO
=========================================================
*/

function pararAcompanhamentoGPS(){

    acompanhandoGPS = false;

}
/*
=========================================================
DESLIGAR GPS
=========================================================
*/

function desligarGPS(){

    acompanhandoGPS = false;

    if(

        watchID !== null

    ){

        navigator.geolocation.clearWatch(

            watchID

        );

        watchID = null;

    }

    if(

        marcadorUsuario

    ){

        mapa.removeLayer(

            marcadorUsuario

        );

        marcadorUsuario = null;

    }

    if(

        circuloPrecisao

    ){

        mapa.removeLayer(

            circuloPrecisao

        );

        circuloPrecisao = null;

    }

    ultimaLocalizacao = null;

}

/*
=========================================================
ERRO
=========================================================
*/

function erroLocalizacao(erro){

    console.warn(

        "Erro de geolocalização:",

        erro.message

    );

}

/*
=========================================================
UTILITÁRIOS
=========================================================
*/

function gpsAtivo(){

    return watchID !== null;

}

function possuiLocalizacao(){

    return ultimaLocalizacao !== null;

}

function obterLocalizacaoAtual(){

    return ultimaLocalizacao;

}

/*
=========================================================
API
=========================================================
*/

window.gpsAPI = {

    centralizarUsuario,

    pararAcompanhamentoGPS,

    desligarGPS,

    gpsAtivo,

    possuiLocalizacao,

    obterLocalizacaoAtual

};

/*
=========================================================
FIM
=========================================================
*/
