/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
util.js
Versão 1.0
=========================================================
*/

/*
=========================================================
VERIFICAR VALOR
=========================================================
*/

function existe(valor){

    return valor!==undefined &&
           valor!==null &&
           valor!=="";

}

/*
=========================================================
COORDENADAS
=========================================================
*/

function coordenadasValidas(lat,lng){

    if(typeof lat!=="number") return false;

    if(typeof lng!=="number") return false;

    if(lat<-90 || lat>90) return false;

    if(lng<-180 || lng>180) return false;

    return true;

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
ESCAPAR HTML
=========================================================
*/

function escaparHTML(texto){

    const div=document.createElement("div");

    div.textContent=texto;

    return div.innerHTML;

}

/*
=========================================================
CAPITALIZAR
=========================================================
*/

function capitalizar(texto){

    texto = String(texto || "").trim();

    if(!texto){

        return "";

    }

    return texto

        .split(" ")

        .map(

            palavra=>

                palavra.charAt(0).toUpperCase() +

                palavra.slice(1)

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

    if(!mapa){

        return 0;

    }

    return mapa.distance(

        [lat1,lng1],

        [lat2,lng2]

    );

}
/*
=========================================================
FORMATAR DISTÂNCIA
=========================================================
*/

function formatarDistancia(valor){

    if(valor<1000){

        return Math.round(valor)+" m";

    }

    return (valor/1000)

        .toFixed(1)

        .replace(".",",")

        +" km";

}

/*
=========================================================
ID ÚNICO
=========================================================
*/

function gerarID(){

    return Date.now()

        .toString(36)

        +

        Math.random()

        .toString(36)

        .substring(2,8);

}

/*
=========================================================
LOG
=========================================================
*/

const DEBUG = false;

function log(){

    if(!DEBUG){

        return;

    }

    console.log(

        "[Mapa]",

        ...arguments

    );

}
