/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
mapa.js
Versão 4.0
=========================================================
*/

/*
=========================================================
LIMITES DO MAPA
=========================================================
*/

const LIMITES_MAPA = [

    [

        -21.731000,

        -44.320000

    ],

    [

        -21.751000,

        -44.296000

    ]

];

/*
=========================================================
INICIAR MAPA
=========================================================
*/

function iniciarMapa(){

    mapa = L.map(

        "map",

        {

            center: CONFIG.centro,

            zoom: CONFIG.zoomInicial,

            minZoom: CONFIG.zoomMinimo,

            maxZoom: CONFIG.zoomMaximo,

            zoomControl: false,

            attributionControl: false,

            preferCanvas: true,

            zoomSnap: 0.25,

            zoomDelta: 0.25,

            wheelPxPerZoomLevel: 120,

            inertia: true,

            inertiaDeceleration: 2500,

            worldCopyJump: false,

            maxBounds: LIMITES_MAPA,

            maxBoundsViscosity: 1,

            zoomAnimation: true,

            fadeAnimation: true,

            markerZoomAnimation: true

        }

    );

    criarCamadaSatelite();

    criarPanes();

    criarCamadasSVG();

    criarTexturaPergaminho();

    registrarEventosMapa();

    atualizarModoMapa();

}

/*
=========================================================
PANES
=========================================================
*/

function criarPanes(){

    if(

        mapa.getPane("paneSVG")

    ){

        return;

    }

    mapa.createPane(

        "paneSVG"

    );

    mapa.getPane(

        "paneSVG"

    ).style.zIndex = 350;

}

/*
=========================================================
CAMADA SATÉLITE
=========================================================
*/

function criarCamadaSatelite(){

    camadaSatelite = L.tileLayer(

        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",

        {

            attribution: "© Esri",

            maxZoom: 20,

            maxNativeZoom: 19,

            noWrap: true,

            keepBuffer: 6,

            updateWhenIdle: true,

            updateWhenZooming: false

        }

    );

    camadaSatelite.addTo(

        mapa

    );

}
/*
=========================================================
CAMADAS SVG
=========================================================
*/

function criarCamadasSVG(){

    limparCamadasSVG();

    adicionarSVG("ruas.svg");

    adicionarSVG("rios.svg");

    adicionarSVG("vegetacao.svg");

    adicionarSVG("trilhas.svg");

    adicionarSVG("desenhos.svg");

}

function adicionarSVG(nome){

    const camada = L.svgOverlay(

        CONFIG.caminhos.overlay + nome,

        LIMITES_MAPA,

        {

            pane: "paneSVG",

            opacity: 1,

            interactive: false

        }

    );

    camadasSVG.push(

        camada

    );

    if(mapaIlustrado){

        camada.addTo(

            mapa

        );

    }

}

/*
=========================================================
TEXTURA PERGAMINHO
=========================================================
*/

function criarTexturaPergaminho(){

    let textura = document.getElementById(

        "texturaPergaminho"

    );

    if(textura){

        return;

    }

    textura = document.createElement(

        "div"

    );

    textura.id = "texturaPergaminho";

    textura.style.position = "absolute";

    textura.style.left = "0";

    textura.style.top = "0";

    textura.style.width = "100%";

    textura.style.height = "100%";

    textura.style.pointerEvents = "none";

    textura.style.zIndex = "349";

    textura.style.opacity = ".38";

    textura.style.backgroundImage =

        "url('img/interface/papel.webp')";

    textura.style.backgroundRepeat =

        "repeat";

    textura.style.backgroundSize =

        "700px";

    mapa.getContainer().appendChild(

        textura

    );

}

/*
=========================================================
ATUALIZAR TEXTURA
=========================================================
*/

function atualizarTexturaPergaminho(){

    const textura = document.getElementById(

        "texturaPergaminho"

    );

    if(!textura){

        return;

    }

    textura.style.display =

        mapaIlustrado

            ? "block"

            : "none";

}

/*
=========================================================
MOSTRAR SVGs
=========================================================
*/

function mostrarSVGs(){

    if(!camadasSVG.length){

        return;

    }

    camadasSVG.forEach(

        camada=>{

            if(

                !mapa.hasLayer(

                    camada

                )

            ){

                camada.addTo(

                    mapa

                );

            }

        }

    );

}

/*
=========================================================
ESCONDER SVGs
=========================================================
*/

function esconderSVGs(){

    if(!camadasSVG.length){

        return;

    }

    camadasSVG.forEach(

        camada=>{

            if(

                mapa.hasLayer(

                    camada

                )

            ){

                mapa.removeLayer(

                    camada

                );

            }

        }

    );

}

/*
=========================================================
RECARREGAR SVGs
=========================================================
*/

function recarregarSVGs(){

    limparCamadasSVG();

    criarCamadasSVG();

}
/*
=========================================================
MODOS DO MAPA
=========================================================
*/

function atualizarModoMapa(){

    if(mapaIlustrado){

        ativarModoPergaminho();

    }else{

        ativarModoSatelite();

    }

}

function alternarModoMapa(){

    mapaIlustrado = !mapaIlustrado;

    atualizarModoMapa();

}

/*
=========================================================
MODO PERGAMINHO
=========================================================
*/

function ativarModoPergaminho(){

    document.body.classList.add(

        "modo-pergaminho"

    );

    document.body.classList.remove(

        "modo-satelite"

    );

    atualizarTexturaPergaminho();

    mostrarSVGs();

    atualizarBotaoModo();

}

/*
=========================================================
MODO SATÉLITE
=========================================================
*/

function ativarModoSatelite(){

    document.body.classList.remove(

        "modo-pergaminho"

    );

    document.body.classList.add(

        "modo-satelite"

    );

    atualizarTexturaPergaminho();

    esconderSVGs();

    atualizarBotaoModo();

}

/*
=========================================================
BOTÃO DO MODO
=========================================================
*/

function atualizarBotaoModo(){

    const botao = document.getElementById(

        "btnSatellite"

    );

    if(!botao){

        return;

    }

    const imagem = botao.querySelector(

        "img"

    );

    if(!imagem){

        return;

    }

    if(mapaIlustrado){

        imagem.src =

            "img/interface/satelite.svg";

        imagem.alt =

            "Modo Satélite";

        botao.title =

            "Modo Satélite";

    }else{

        imagem.src =

            "img/interface/pergaminho.svg";

        imagem.alt =

            "Modo Pergaminho";

        botao.title =

            "Modo Pergaminho";

    }

}

/*
=========================================================
DEFINIR MODO
=========================================================
*/

function definirModoMapa(pergaminho){

    mapaIlustrado = Boolean(

        pergaminho

    );

    atualizarModoMapa();

}
/*
=========================================================
EVENTOS DO MAPA
=========================================================
*/

function registrarEventosMapa(){

    mapa.on(

        "click",

        clicarMapa

    );

    mapa.on(

        "zoomend",

        ()=>{

            atualizarZoom();

            if(typeof atualizarZoomMarcadores==="function"){

                atualizarZoomMarcadores();

            }

        }

    );

    mapa.on(

        "moveend",

        atualizarMovimento

    );

    mapa.whenReady(

        mapaCarregado

    );

}

/*
=========================================================
MAPA CARREGADO
=========================================================
*/

function mapaCarregado(){

    atualizarZoom();

    atualizarMovimento();

}

/*
=========================================================
CLIQUE NO MAPA
=========================================================
*/

function clicarMapa(){

    if(typeof fecharSheet==="function"){

        fecharSheet();

    }

}

/*
=========================================================
ZOOM
=========================================================
*/

function atualizarZoom(){

    if(!mapa){

        return;

    }

    document.body.setAttribute(

        "data-zoom",

        mapa.getZoom()

    );

}

/*
=========================================================
MOVIMENTO
=========================================================
*/

function atualizarMovimento(){

    /*
    Espaço reservado para
    futuras otimizações.
    */

}

/*
=========================================================
CENTRALIZAR MAPA
=========================================================
*/

function centralizarMapa(

    latitude,

    longitude,

    zoom = 18

){

    if(!mapa){

        return;

    }

    mapa.flyTo(

        [

            latitude,

            longitude

        ],

        zoom,

        {

            animate:true,

            duration:CONFIG.animacao

        }

    );

}

/*
=========================================================
ENQUADRAR ÁREA
=========================================================
*/

function enquadrarMapa(bounds){

    if(!mapa){

        return;

    }

    mapa.fitBounds(

        bounds,

        {

            padding:[40,40],

            animate:true

        }

    );

}

/*
=========================================================
REDIMENSIONAR
=========================================================
*/

function atualizarTamanhoMapa(){

    if(!mapa){

        return;

    }

    mapa.invalidateSize(

        {

            animate:false

        }

    );

}

window.addEventListener(

    "resize",

    ()=>{

        atualizarTamanhoMapa();

    }

);

/*
=========================================================
LIMITES
=========================================================
*/

function atualizarLimites(bounds){

    if(!mapa){

        return;

    }

    mapa.setMaxBounds(

        bounds

    );

}

/*
=========================================================
OBTER CENTRO
=========================================================
*/

function obterCentroMapa(){

    if(!mapa){

        return null;

    }

    return mapa.getCenter();

}

/*
=========================================================
OBTER ZOOM
=========================================================
*/

function obterZoomMapa(){

    if(!mapa){

        return null;

    }

    return mapa.getZoom();

}

/*
=========================================================
VERIFICAR CAMADA
=========================================================
*/

function possuiCamada(camada){

    if(!mapa){

        return false;

    }

    return mapa.hasLayer(

        camada

    );

}
/*
=========================================================
LIMPAR CAMADAS SVG
=========================================================
*/

function limparCamadasSVG(){

    camadasSVG.forEach(

        camada=>{

            if(

                mapa &&

                mapa.hasLayer(

                    camada

                )

            ){

                mapa.removeLayer(

                    camada

                );

            }

        }

    );

    camadasSVG = [];

}

/*
=========================================================
REDESENHAR MAPA
=========================================================
*/

function redesenharMapa(){

    atualizarTamanhoMapa();

    atualizarModoMapa();

}

/*
=========================================================
ATUALIZAR CAMADAS
=========================================================
*/

function atualizarCamadasMapa(){

    recarregarSVGs();

    atualizarModoMapa();

}

/*
=========================================================
RECARREGAR MAPA
=========================================================
*/

function recarregarMapa(){

    atualizarCamadasMapa();

    atualizarZoom();

}

/*
=========================================================
API PÚBLICA
=========================================================
*/

window.mapaAPI = {

    centralizarMapa,

    enquadrarMapa,

    atualizarLimites,

    obterCentroMapa,

    obterZoomMapa,

    definirModoMapa,

    atualizarCamadasMapa,

    recarregarMapa,

    redesenharMapa

};

/*
=========================================================
FIM DO ARQUIVO
=========================================================
*/
