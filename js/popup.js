/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
popup.js
Versão 2.0
=========================================================
*/

/*
=========================================================
ELEMENTOS
=========================================================
*/

const bottomSheet = document.getElementById("bottomSheet");

const sheetFoto = document.getElementById("sheetFoto");

const sheetTitulo = document.getElementById("sheetTitulo");

const sheetCategoria = document.getElementById("sheetCategoria");

const sheetDescricao = document.getElementById("sheetDescricao");

const btnDetalhes = document.getElementById("btnDetalhes");

const btnRota = document.getElementById("btnRota");

/*
=========================================================
VARIÁVEIS
=========================================================
*/

let itemSelecionado = null;

let sheetAberto = false;

let inicioY = 0;

let fimY = 0;

/*
=========================================================
ABRIR
=========================================================
*/

function abrirSheet(item){

    if(!bottomSheet){

        return;

    }

    itemSelecionado = item;

    preencherSheet(item);

    sheetAberto = true;

    bottomSheet.classList.add("open");

}

/*
=========================================================
FECHAR
=========================================================
*/

function fecharSheet(){

    if(!bottomSheet){

        return;

    }

    sheetAberto = false;

    bottomSheet.classList.remove("open");

    itemSelecionado = null;

    if(typeof removerDestaques==="function"){

        removerDestaques();

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

    sheetFoto.src = item.foto || "img/interface/sem-foto.webp";

    sheetTitulo.textContent = item.nome || "";

    sheetCategoria.textContent = item.categoria || "";

    sheetDescricao.textContent = item.descricaoCurta || "";

}

/*
=========================================================
DETALHES
=========================================================
*/

if(btnDetalhes){

    btnDetalhes.addEventListener(

        "click",

        ()=>{

            if(

                itemSelecionado &&

                itemSelecionado.pagina

            ){

                window.location.href = itemSelecionado.pagina;

            }

        }

    );

}

/*
=========================================================
ROTA
=========================================================
*/

if(btnRota){

    btnRota.addEventListener(

        "click",

        ()=>{

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

    );

}

/*
=========================================================
GESTO
=========================================================
*/

if(bottomSheet){

    bottomSheet.addEventListener(

        "touchstart",

        e=>{

            inicioY = e.touches[0].clientY;

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

            if(fimY - inicioY > 80){

                fecharSheet();

            }

        }

    );

}

/*
=========================================================
MAPA
=========================================================
*/

function ativarFechamentoMapa(){

    if(!mapa){

        return;

    }

    mapa.on(

        "click",

        fecharSheet

    );

}

/*
=========================================================
UTILITÁRIO
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

if(sheetFoto){

    sheetFoto.addEventListener(

        "error",

        ()=>{

            sheetFoto.src = "img/interface/sem-foto.webp";

        }

    );

}

/*
=========================================================
TECLADO
=========================================================
*/

document.addEventListener(

    "keydown",

    e=>{

        if(e.key==="Escape"){

            fecharSheet();

        }

    }

);

/*
=========================================================
INICIALIZAÇÃO
=========================================================
*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        setTimeout(

            ativarFechamentoMapa,

            300

        );

    }

);
