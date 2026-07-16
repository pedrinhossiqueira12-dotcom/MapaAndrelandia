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
/*
=========================================================
ABRIR SHEET
=========================================================
*/

function abrirSheet(item){

    if(

        !bottomSheet ||

        !item

    ){

        return;

    }

    itemSelecionado = item;

    preencherSheet(

        item

    );

    sheetAberto = true;

    bottomSheet.classList.add(

        "open"

    );

}

/*
=========================================================
FECHAR SHEET
=========================================================
*/

function fecharSheet(){

    if(!bottomSheet){

        return;

    }

    sheetAberto = false;

    bottomSheet.classList.remove(

        "open"

    );

    itemSelecionado = null;

    if(

        typeof limparMarcadorSelecionado==="function"

    ){

        limparMarcadorSelecionado();

    }

}

/*
=========================================================
PREENCHER
=========================================================
*/

function preencherSheet(item){

    if(!item){

        return;

    }

    sheetFoto.src =

        item.foto ||

        "img/interface/sem-foto.webp";

    sheetTitulo.textContent =

        item.nome || "";

    sheetCategoria.textContent =

        item.categoria || "";

    sheetDescricao.textContent =

        item.descricaoCurta ||

        item.descricao ||

        "";

}

/*
=========================================================
BOTÕES
=========================================================
*/

function configurarBotoes(){

    if(btnDetalhes){

        btnDetalhes.addEventListener(

            "click",

            abrirPaginaLocal

        );

    }

    if(btnRota){

        btnRota.addEventListener(

            "click",

            abrirRotaGoogle

        );

    }

}

/*
=========================================================
PÁGINA DO LOCAL
=========================================================
*/

function abrirPaginaLocal(){

    if(!itemSelecionado){

        return;

    }

    window.location.href =

        "pages/local.html?id=" +

        encodeURIComponent(

            itemSelecionado.id

        );

}

/*
=========================================================
GOOGLE MAPS
=========================================================
*/

function abrirRotaGoogle(){

    if(

        !itemSelecionado ||

        itemSelecionado.latitude===undefined ||

        itemSelecionado.longitude===undefined

    ){

        return;

    }

    window.open(

        "https://www.google.com/maps/dir/?api=1&destination=" +

        itemSelecionado.latitude +

        "," +

        itemSelecionado.longitude,

        "_blank"

    );

}
/*
=========================================================
GESTOS
=========================================================
*/

function configurarGestos(){

    if(!bottomSheet){

        return;

    }

    bottomSheet.addEventListener(

        "touchstart",

        e=>{

            inicioY = e.touches[0].clientY;

            fimY = inicioY;

        }

    );

    bottomSheet.addEventListener(

        "touchmove",

        e=>{

            fimY = e.touches[0].clientY;

        }

    );

    bottomSheet.addEventListener(

        "touchend",

        ()=>{

            if(

                fimY - inicioY > 80

            ){

                fecharSheet();

            }

        }

    );

}

/*
=========================================================
SHEET ABERTO
=========================================================
*/

function sheetEstaAberto(){

    return sheetAberto;

}

/*
=========================================================
ERRO DA FOTO
=========================================================
*/

if(

    document.readyState==="loading"

){

    document.addEventListener(

        "DOMContentLoaded",

        configurarImagemSheet

    );

}else{

    configurarImagemSheet();

}

function configurarImagemSheet(){

    if(!sheetFoto){

        sheetFoto = document.getElementById(

            "sheetFoto"

        );

    }

    if(!sheetFoto){

        return;

    }

    sheetFoto.addEventListener(

        "error",

        ()=>{

            sheetFoto.src =

                "img/interface/sem-foto.webp";

        }

    );

}

/*
=========================================================
TECLA ESC
=========================================================
*/

document.addEventListener(

    "keydown",

    e=>{

        if(

            e.key==="Escape"

        ){

            fecharSheet();

        }

    }

);

/*
=========================================================
API
=========================================================
*/

window.popupAPI = {

    abrirSheet,

    fecharSheet,

    sheetEstaAberto

};

/*
=========================================================
FIM
=========================================================
*/
