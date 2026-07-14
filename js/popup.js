/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
popup.js
Versão 1.0
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

/*
=========================================================
ABRIR
=========================================================
*/

function abrirSheet(item){

    itemSelecionado = item;

    preencherSheet(item);

    bottomSheet.classList.add("open");

}

/*
=========================================================
FECHAR
=========================================================
*/

function fecharSheet(){

    bottomSheet.classList.remove("open");

    removerDestaques();

}

/*
=========================================================
PREENCHER
=========================================================
*/

function preencherSheet(item){

    sheetFoto.src =
        item.foto ||
        "img/interface/sem-foto.webp";

    sheetTitulo.textContent =
        item.nome || "";

    sheetCategoria.textContent =
        item.categoria || "";

    sheetDescricao.textContent =
        item.descricaoCurta || "";

}
