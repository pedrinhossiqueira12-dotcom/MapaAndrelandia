/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
config.js
Versão 1.0
=========================================================
*/

const CONFIG={

    /*
    =========================================================
    MAPA
    =========================================================
    */

    centro:[

        -21.739580,

        -44.309860

    ],

    zoomInicial:16,

    zoomMinimo:14,

    zoomMaximo:20,

    animacao:0.8,

    /*
    =========================================================
    LIMITES
    (ajustaremos depois com precisão)
    =========================================================
    */

    limites:[

        [

            -21.727500,

            -44.324500

        ],

        [

            -21.751500,

            -44.294500

        ]

    ],

    /*
    =========================================================
    CAMINHOS
    =========================================================
    */

    caminhos:{

        dados:"data/",

        icones:"img/icones/",

        interface:"img/interface/",

        overlay:"img/overlay/",

        fotos:"img/fotos/"

    },

    /*
    =========================================================
    GPS
    =========================================================
    */

    gps:{

        enableHighAccuracy:true,

        timeout:10000,

        maximumAge:3000,

        watch:true

    },

    /*
    =========================================================
    PESQUISA
    =========================================================
    */

    pesquisa:{

        minimoCaracteres:1,

        maxResultados:20

    }

};
/*
=========================================================
ÍCONES PADRÃO
=========================================================
*/

CONFIG.icones={

    padrao:"padrao.svg",

    igreja:"igreja.svg",

    restaurante:"restaurante.svg",

    cafeteria:"cafeteria.svg",

    hotel:"hotel.svg",

    comercio:"comercio.svg",

    natureza:"natureza.svg",

    esporte:"esporte.svg",

    mirante:"mirante.svg"

};

/*
=========================================================
MODO INICIAL
=========================================================
*/

CONFIG.modoInicial="pergaminho";

/*
=========================================================
VERSÃO
=========================================================
*/

CONFIG.versao="1.0.0";
