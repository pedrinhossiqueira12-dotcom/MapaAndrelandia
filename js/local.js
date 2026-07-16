/*
=========================================================
GUIA TURÍSTICO DE ANDRELÂNDIA
local.js
Versão 2.0
=========================================================
*/

/*
=========================================================
VARIÁVEIS
=========================================================
*/

let localAtual = null;

let locais = [];

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
CARREGAR JSON
=========================================================
*/

async function carregarDados(){

    try{

        const resposta = await fetch(

            "../data/locais.json"

        );

        locais = await resposta.json();

    }

    catch(e){

        paginaNaoEncontrada();

    }

}

/*
=========================================================
OBTER ID
=========================================================
*/

function obterID(){

    const params = new URLSearchParams(

        window.location.search

    );

    return params.get("id");

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
PREENCHER PÁGINA
=========================================================
*/

function preencherPagina(){

    document.title =

        localAtual.nome ||

        "Guia Turístico";

    definirTexto(

        "titulo",

        localAtual.nome

    );

    definirTexto(

        "categoria",

        localAtual.categoria

    );

    definirTexto(

        "historia",

        localAtual.historia

    );

    definirTexto(

        "curiosidades",

        localAtual.curiosidades

    );

    definirTexto(

        "tempo",

        localAtual.tempoVisita

    );

    definirTexto(

        "endereco",

        localAtual.endereco

    );

    const hero = document.getElementById(

        "heroImagem"

    );

    if(hero){

        hero.src =

            localAtual.capa ||

            localAtual.foto ||

            "../img/interface/sem-foto.webp";

        hero.alt =

            localAtual.nome || "";

    }

    carregarGaleria();

    iniciarMapaLocal();

}

/*
=========================================================
UTILITÁRIO
=========================================================
*/

function definirTexto(

    id,

    texto

){

    const elemento = document.getElementById(

        id

    );

    if(!elemento){

        return;

    }

    elemento.textContent =

        texto || "";

}
/*
=========================================================
GALERIA
=========================================================
*/

function carregarGaleria(){

    const galeria = document.getElementById(

        "galeria"

    );

    if(!galeria){

        return;

    }

    galeria.innerHTML = "";

    if(

        !Array.isArray(localAtual.galeria) ||

        localAtual.galeria.length===0

    ){

        galeria.innerHTML =

            "<p>Nenhuma imagem disponível.</p>";

        return;

    }

    localAtual.galeria.forEach(

        foto=>{

            const img = document.createElement(

                "img"

            );

            img.src = foto;

            img.loading = "lazy";

            img.alt = localAtual.nome || "";

            img.onerror = ()=>{

                img.src =

                "../img/interface/sem-foto.webp";

            };

            img.addEventListener(

                "click",

                ()=>{

                    abrirLightbox(

                        foto

                    );

                }

            );

            galeria.appendChild(

                img

            );

        }

    );

}

/*
=========================================================
LIGHTBOX
=========================================================
*/

function abrirLightbox(src){

    const lightbox = document.getElementById(

        "lightbox"

    );

    const imagem = document.getElementById(

        "lightboxImagem"

    );

    if(

        !lightbox ||

        !imagem

    ){

        return;

    }

    imagem.src = src;

    lightbox.classList.add(

        "open"

    );

}

function fecharLightbox(){

    const lightbox = document.getElementById(

        "lightbox"

    );

    if(!lightbox){

        return;

    }

    lightbox.classList.remove(

        "open"

    );

}
/*
=========================================================
MAPA LOCAL
=========================================================
*/

function iniciarMapaLocal(){

    const elemento = document.getElementById(

        "mapaLocal"

    );

    if(

        !elemento ||

        localAtual.latitude===undefined ||

        localAtual.longitude===undefined

    ){

        return;

    }

    const mapa = L.map(

        "mapaLocal",

        {

            zoomControl:false,

            attributionControl:false

        }

    );

    mapa.setView(

        [

            localAtual.latitude,

            localAtual.longitude

        ],

        18

    );

    L.tileLayer(

        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

        {

            maxZoom:20,

            maxNativeZoom:19

        }

    ).addTo(

        mapa

    );

    L.marker(

        [

            localAtual.latitude,

            localAtual.longitude

        ]

    ).addTo(

        mapa

    );

}

/*
=========================================================
EVENTOS
=========================================================
*/

function configurarEventos(){

    const voltar = document.getElementById(

        "btnVoltar"

    );

    if(voltar){

        voltar.addEventListener(

            "click",

            ()=>history.back()

        );

    }

    const rota = document.getElementById(

        "btnComoChegar"

    );

    if(rota){

        rota.addEventListener(

            "click",

            ()=>{

                window.open(

                    "https://www.google.com/maps/dir/?api=1&destination=" +

                    localAtual.latitude +

                    "," +

                    localAtual.longitude,

                    "_blank"

                );

            }

        );

    }

    const compartilhar = document.getElementById(

        "btnCompartilhar"

    );

    if(

        compartilhar &&

        navigator.share

    ){

        compartilhar.addEventListener(

            "click",

            ()=>{

                navigator.share({

                    title:localAtual.nome,

                    text:localAtual.nome,

                    url:window.location.href

                });

            }

        );

    }

    const lightbox = document.getElementById(

        "lightbox"

    );

    if(lightbox){

        lightbox.addEventListener(

            "click",

            fecharLightbox

        );

    }

}

/*
=========================================================
ERRO
=========================================================
*/

function paginaNaoEncontrada(){

    document.body.innerHTML = `

        <main style="padding:40px;text-align:center;">

            <h1>

                Local não encontrado

            </h1>

            <p>

                O ponto turístico solicitado não existe.

            </p>

        </main>

    `;

}

/*
=========================================================
API
=========================================================
*/

window.localAPI = {

    obterID,

    iniciarMapaLocal,

    abrirLightbox,

    fecharLightbox

};

/*
=========================================================
FIM
=========================================================
*/
