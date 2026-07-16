/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
util.js
Versão 2.0
=========================================================
*/

/*
=========================================================
DEBUG
=========================================================
*/

const DEBUG =

    location.hostname === "localhost";

/*
=========================================================
EXISTE
=========================================================
*/

function existe(valor){

    return (

        valor !== undefined &&

        valor !== null &&

        valor !== ""

    );

}

/*
=========================================================
TEXTO
=========================================================
*/

function texto(valor){

    if(!existe(valor)){

        return "";

    }

    return String(valor).trim();

}

/*
=========================================================
NÚMERO
=========================================================
*/

function numero(valor){

    const n = Number(valor);

    return Number.isFinite(n)

        ? n

        : 0;

}

/*
=========================================================
COORDENADAS
=========================================================
*/

function coordenadasValidas(

    latitude,

    longitude

){

    latitude = numero(latitude);

    longitude = numero(longitude);

    return (

        latitude >= -90 &&

        latitude <= 90 &&

        longitude >= -180 &&

        longitude <= 180

    );

}
/*
=========================================================
ESCAPAR HTML
=========================================================
*/

function escaparHTML(textoOriginal){

    const elemento = document.createElement(

        "div"

    );

    elemento.textContent = texto(

        textoOriginal

    );

    return elemento.innerHTML;

}

/*
=========================================================
CAPITALIZAR
=========================================================
*/

function capitalizar(textoOriginal){

    return texto(textoOriginal)

        .split(/\s+/)

        .map(

            palavra=>{

                if(

                    palavra.length <= 2 ||

                    /^[A-Z0-9-]+$/.test(palavra)

                ){

                    return palavra.toUpperCase();

                }

                return (

                    palavra.charAt(0).toUpperCase() +

                    palavra.slice(1).toLowerCase()

                );

            }

        )

        .join(" ");

}

/*
=========================================================
DISTÂNCIA
=========================================================
*/

function distancia(

    lat1,

    lng1,

    lat2,

    lng2

){

    if(

        typeof mapa === "undefined" ||

        !mapa

    ){

        return 0;

    }

    return mapa.distance(

        [

            numero(lat1),

            numero(lng1)

        ],

        [

            numero(lat2),

            numero(lng2)

        ]

    );

}

/*
=========================================================
FORMATAR DISTÂNCIA
=========================================================
*/

function formatarDistancia(valor){

    valor = numero(valor);

    if(valor < 1000){

        return Math.round(valor) + " m";

    }

    return (

        valor / 1000

    )

    .toFixed(1)

    .replace(".",",")

    + " km";

}

/*
=========================================================
GERAR ID
=========================================================
*/

function gerarID(){

    return (

        Date.now().toString(36) +

        Math.random()

        .toString(36)

        .substring(2,10)

    );

}

/*
=========================================================
LOG
=========================================================
*/

function log(){

    if(!DEBUG){

        return;

    }

    console.log(

        "[Mapa]",

        ...arguments

    );

}

/*
=========================================================
API
=========================================================
*/

window.utilAPI = {

    existe,

    texto,

    numero,

    coordenadasValidas,

    escaparHTML,

    capitalizar,

    distancia,

    formatarDistancia,

    gerarID,

    log

};

/*
=========================================================
FIM
=========================================================
*/
