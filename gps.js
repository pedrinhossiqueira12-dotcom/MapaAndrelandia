/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
gps.js
Versão 1.0
=========================================================
*/

/*
=========================================================
VARIÁVEIS
=========================================================
*/

let ultimaLocalizacao = null;

let acompanhandoGPS = true;

/*
=========================================================
INICIAR
=========================================================
*/

function iniciarGPS(){

    if(!navigator.geolocation){

        console.warn("Geolocalização não suportada.");

        return;

    }

    navigator.geolocation.watchPosition(

        atualizarLocalizacao,

        erroLocalizacao,

        {

            enableHighAccuracy:true,

            maximumAge:3000,

            timeout:10000

        }

    );

}

/*
=========================================================
ATUALIZAR LOCALIZAÇÃO
=========================================================
*/

function atualizarLocalizacao(posicao){

    const latitude = posicao.coords.latitude;

    const longitude = posicao.coords.longitude;

    const precisao = posicao.coords.accuracy;

    ultimaLocalizacao = [

        latitude,

        longitude

    ];

    atualizarMarcadorUsuario(

        latitude,

        longitude,

        precisao

    );

}

/*
=========================================================
MARCADOR
=========================================================
*/

function atualizarMarcadorUsuario(

    latitude,

    longitude,

    precisao

){

    if(marcadorUsuario){

        marcadorUsuario.setLatLng([

            latitude,

            longitude

        ]);

    }else{

        marcadorUsuario = L.circleMarker(

            [

                latitude,

                longitude

            ],

            {

                radius:8,

                color:"#ffffff",

                weight:3,

                fillColor:"#1e88ff",

                fillOpacity:1

            }

        ).addTo(mapa);

    }

    if(circuloPrecisao){

        circuloPrecisao.setLatLng([

            latitude,

            longitude

        ]);

        circuloPrecisao.setRadius(precisao);

    }else{

        circuloPrecisao = L.circle(

            [

                latitude,

                longitude

            ],

            {

                radius:precisao,

                color:"#1e88ff",

                weight:1,

                fillColor:"#1e88ff",

                fillOpacity:0.12

            }

        ).addTo(mapa);

    }

}

/*
=========================================================
CENTRALIZAR
=========================================================
*/

function centralizarUsuario(){

    if(!ultimaLocalizacao){

        return;

    }

    mapa.flyTo(

        ultimaLocalizacao,

        18,

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

function pararGPS(){

    acompanhandoGPS = false;

}

/*
=========================================================
ERRO
=========================================================
*/

function erroLocalizacao(erro){

    console.warn(

        "Erro GPS:",

        erro.message

    );

}
