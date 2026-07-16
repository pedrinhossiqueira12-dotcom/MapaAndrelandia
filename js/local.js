/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
local.js
Versão 1.0
=========================================================
*/

let localAtual = null;

/*
=========================================================
INICIAR
=========================================================
*/

document.addEventListener(

    "DOMContentLoaded",

    iniciarPaginaLocal

);

async function iniciarPaginaLocal(){

    await carregarDados();

    localizarLocal();

    configurarEventos();

}

/*
=========================================================
CARREGAR DADOS
=========================================================
*/

async function carregarDados(){

    try{

        const resposta = await fetch("../data/locais.json");

        locais = await resposta.json();

    }catch(e){

        paginaNaoEncontrada();

    }

}

/*
=========================================================
OBTER ID
=========================================================
*/

function obterID(){

    const parametros = new URLSearchParams(

        window.location.search

    );

    return parametros.get("id");

}

/*
=========================================================
LOCALIZAR
=========================================================
*/

function localizarLocal(){

    const id = obterID();

    localAtual = locais.find(

        item=>item.id===id

    );

    if(!localAtual){

        paginaNaoEncontrada();

        return;

    }

    preencherPagina();

}

/*
=========================================================
PREENCHER
=========================================================
*/

function preencherPagina(){

    document.title = localAtual.nome;

    document.getElementById("capa").src =
        localAtual.capa ||
        "../img/interface/sem-foto.webp";

    document.getElementById("titulo").textContent =
        localAtual.nome || "";

    document.getElementById("categoria").textContent =
        localAtual.categoria || "";

    document.getElementById("descricao").textContent =
        localAtual.descricao || "";

    document.getElementById("historia").textContent =
        localAtual.historia || "";

    document.getElementById("curiosidades").textContent =
        localAtual.curiosidades || "";

    document.getElementById("tempo").textContent =
        localAtual.tempoVisita || "";

    document.getElementById("endereco").textContent =
        localAtual.endereco || "";

    iniciarMapa();

    carregarGaleria();

}

/*
=========================================================
GALERIA
=========================================================
*/

function carregarGaleria(){

    const galeria = document.getElementById("galeria");

    galeria.innerHTML = "";

    if(!localAtual.galeria){

        return;

    }

    localAtual.galeria.forEach(foto=>{

        const img = document.createElement("img");

        img.src = foto;

        img.loading = "lazy";

        galeria.appendChild(img);

    });

}

/*
=========================================================
MAPA
=========================================================
*/

function iniciarMapa(){

    const mapa = L.map(

        "mapa",

        {

            zoomControl:false,

            attributionControl:false

        }

    ).setView(

        [

            localAtual.latitude,

            localAtual.longitude

        ],

        18

    );

    L.tileLayer(

        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

        {

            maxZoom:20

        }

    ).addTo(mapa);

    L.marker(

        [

            localAtual.latitude,

            localAtual.longitude

        ]

    ).addTo(mapa);

}

/*
=========================================================
EVENTOS
=========================================================
*/

function configurarEventos(){

    document.getElementById(

        "btnVoltar"

    ).addEventListener(

        "click",

        ()=>history.back()

    );

    document.getElementById(

        "btnRota"

    ).addEventListener(

        "click",

        ()=>{

            window.open(

                "https://www.google.com/maps/dir/?api=1&destination="+

                localAtual.latitude+

                ","+

                localAtual.longitude,

                "_blank"

            );

        }

    );

}

/*
=========================================================
ERRO
=========================================================
*/

function paginaNaoEncontrada(){

    document.body.innerHTML =

    "<h1>Local não encontrado.</h1>";

}
