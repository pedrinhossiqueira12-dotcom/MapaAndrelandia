/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
popup.js
Versão 3.0
=========================================================
*/

/*
=========================================================
VARIÁVEIS
=========================================================
*/

let bottomSheet;

let sheetFoto;

let sheetTitulo;

let sheetCategoria;

let sheetDescricao;

let btnDetalhes;

let btnRota;

let itemSelecionado = null;

let sheetAberto = false;

let inicioY = 0;

let fimY = 0;

/*
=========================================================
INICIAR
=========================================================
*/

function iniciarPopup(){

    bottomSheet = document.getElementById(

        "bottomSheet"

    );

    sheetFoto = document.getElementById(

        "sheetFoto"

    );

    sheetTitulo = document.getElementById(

        "sheetTitulo"

    );

    sheetCategoria = document.getElementById(

        "sheetCategoria"

    );

    sheetDescricao = document.getElementById(

        "sheetDescricao"

    );

    btnDetalhes = document.getElementById(

        "btnDetalhes"

    );

    btnRota = document.getElementById(

        "btnRota"

    );

    configurarBotoes();

    configurarGestos();

}
