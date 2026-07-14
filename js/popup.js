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
/*
=========================================================
BOTÃO DETALHES
=========================================================
*/

btnDetalhes.addEventListener("click",()=>{

    if(!itemSelecionado){

        return;

    }

    if(itemSelecionado.pagina){

        window.location.href = itemSelecionado.pagina;

    }

});

/*
=========================================================
BOTÃO ROTA
=========================================================
*/

btnRota.addEventListener("click",()=>{

    if(!itemSelecionado){

        return;

    }

    if(
        itemSelecionado.latitude===undefined ||
        itemSelecionado.longitude===undefined
    ){

        return;

    }

    const url =

    "https://www.google.com/maps/dir/?api=1" +

    "&destination=" +

    itemSelecionado.latitude +

    "," +

    itemSelecionado.longitude;

    window.open(

        url,

        "_blank"

    );

});

/*
=========================================================
CLIQUE NO MAPA
=========================================================
*/

function ativarFechamentoMapa(){

    mapa.on(

        "click",

        ()=>{

            fecharSheet();

        }

    );

}

/*
=========================================================
GESTOS
=========================================================
*/

let inicioY = 0;

let fimY = 0;

bottomSheet.addEventListener(

    "touchstart",

    e=>{

        inicioY =

            e.touches[0].clientY;

    }

);

bottomSheet.addEventListener(

    "touchmove",

    e=>{

        fimY =

            e.touches[0].clientY;

    }

);

bottomSheet.addEventListener(

    "touchend",

    ()=>{

        const distancia =

            fimY - inicioY;

        if(

            distancia>80

        ){

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

        if(typeof mapa!=="undefined"){

            setTimeout(

                ativarFechamentoMapa,

                500

            );

        }

    }

);
/*
=========================================================
ANIMAÇÕES
=========================================================
*/

let sheetAberto = false;

function mostrarSheet(){

    sheetAberto = true;

    bottomSheet.classList.add("open");

}

function esconderSheet(){

    sheetAberto = false;

    bottomSheet.classList.remove("open");

}

/*
=========================================================
ABRIR
=========================================================
*/

function abrirSheet(item){

    itemSelecionado = item;

    preencherSheet(item);

    mostrarSheet();

}

/*
=========================================================
FECHAR
=========================================================
*/

function fecharSheet(){

    esconderSheet();

    removerDestaques();

    itemSelecionado = null;

}

/*
=========================================================
ATUALIZAR FOTO
=========================================================
*/

sheetFoto.addEventListener("error",()=>{

    sheetFoto.src="img/interface/sem-foto.webp";

});

/*
=========================================================
ESC
=========================================================
*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        fecharSheet();

    }

});

/*
=========================================================
ESTADO
=========================================================
*/

function sheetEstaAberto(){

    return sheetAberto;

}
