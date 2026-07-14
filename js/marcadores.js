/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
marcadores.js
Versão 1.0
=========================================================
*/

/*
=========================================================
CAMADAS DE MARCADORES
=========================================================
*/

const camadaLocais = L.layerGroup();

const camadaComercios = L.layerGroup();

/*
=========================================================
ÍCONES
=========================================================
*/

const cacheIcones = {};

/*
=========================================================
INICIALIZAÇÃO
=========================================================
*/

function iniciarMarcadores(){

    camadaLocais.addTo(mapa);

    camadaComercios.addTo(mapa);

    carregarLocais();

    carregarComercios();

}

/*
=========================================================
LOCAIS
=========================================================
*/

function carregarLocais(){

    if(!Array.isArray(locais)){

        return;

    }

    locais.forEach(local=>{

        criarMarcador(local,"local");

    });

}

/*
=========================================================
COMÉRCIOS
=========================================================
*/

function carregarComercios(){

    if(!Array.isArray(comercios)){

        return;

    }

    comercios.forEach(comercio=>{

        criarMarcador(comercio,"comercio");

    });

}

/*
=========================================================
CRIAR MARCADOR
=========================================================
*/

function criarMarcador(item,tipo){

    if(item.visivel===false){

        return;

    }

    if(item.latitude===undefined || item.longitude===undefined){

        return;

    }

    const marcador = L.marker(

        [

            item.latitude,

            item.longitude

        ],

        {

            icon:criarDivIcon(item)

        }

    );

    marcador.dados=item;

    marcador.tipo=tipo;

    marcador.on(

        "click",

        ()=>{

            abrirPopup(marcador);

        }

    );

    if(tipo==="local"){

        camadaLocais.addLayer(marcador);

    }else{

        camadaComercios.addLayer(marcador);

    }

    marcadores.push(marcador);

}

/*
=========================================================
ÍCONE
=========================================================
*/

function getIcone(item){

    const nome=item.icone || "padrao.svg";

    if(cacheIcones[nome]){

        return cacheIcones[nome];

    }

    const icone=L.icon({

        iconUrl:CONFIG.caminhos.icones + nome,

        iconSize:[34,42],

        iconAnchor:[17,42],

        popupAnchor:[0,-38]

    });

    cacheIcones[nome]=icone;

    return icone;

}
/*
=========================================================
POPUP
=========================================================
*/

function abrirPopup(marcador){

    destacarMarcador(

        marcador.dados.id

    );

    abrirSheet(

        marcador.dados

    );

}

/*
=========================================================
HTML DO POPUP
=========================================================
*/

function criarPopup(item){

    const foto = item.foto || "img/interface/sem-foto.webp";

    const categoria = item.categoria || "";

    const descricao = item.descricaoCurta || "";

    const pagina = item.pagina || "#";

    return `

<div class="popup">

    <div class="popup-foto">

        <img
            src="${foto}"
            loading="lazy">

    </div>

    <div class="popup-conteudo">

        <h2>${item.nome}</h2>

        <span class="popup-categoria">

            ${categoria}

        </span>

        <p>

            ${descricao}

        </p>

        <button
            class="popup-botao"
            onclick="abrirPagina('${pagina}')">

            Ver detalhes

        </button>

    </div>

</div>

`;

}

/*
=========================================================
ABRIR PÁGINA
=========================================================
*/

function abrirPagina(url){

    window.location.href = url;

}

/*
=========================================================
LOCALIZAR MARCADOR
=========================================================
*/

function localizarMarcador(id){

    const marcador = marcadores.find(

        m => m.dados.id === id

    );

    if(!marcador){

        return;

    }

    mapa.flyTo(

        marcador.getLatLng(),

        18,

        {

            animate:true,

            duration:CONFIG.animacao

        }

    );

    setTimeout(()=>{

        abrirPopup(marcador);

    },500);

}

/*
=========================================================
OBTER MARCADOR
=========================================================
*/

function getMarcador(id){

    return marcadores.find(

        marcador => marcador.dados.id===id

    );

}

/*
=========================================================
MOSTRAR TODOS
=========================================================
*/

function mostrarTodosMarcadores(){

    camadaLocais.addTo(mapa);

    camadaComercios.addTo(mapa);

}

/*
=========================================================
OCULTAR TODOS
=========================================================
*/

function ocultarTodosMarcadores(){

    mapa.removeLayer(camadaLocais);

    mapa.removeLayer(camadaComercios);

}

/*
=========================================================
REMOVER POPUPS
=========================================================
*/

function fecharTodosPopups(){

    marcadores.forEach(

        marcador=>{

            marcador.closePopup();

        }

    );

}
/*
=========================================================
CRIAR DIVICON
=========================================================
*/

function criarDivIcon(item){

    const icone = item.icone || "padrao.svg";

    return L.divIcon({

        className:"marker-wrapper",

        html:`

            <div
                class="marker"
                data-id="${item.id}">

                <div class="marker-shadow"></div>

                <div class="marker-icon">

                    <img
                        src="${CONFIG.caminhos.icones}${icone}"
                        loading="lazy"
                        draggable="false">

                </div>

            </div>

        `,

        iconSize:[44,56],

        iconAnchor:[22,52],

        popupAnchor:[0,-42]

    });

}

/*
=========================================================
ATUALIZAR MARCADOR
=========================================================
*/

function atualizarIconeMarcador(marcador){

    marcador.setIcon(

        criarDivIcon(marcador.dados)

    );

}

/*
=========================================================
DESTACAR
=========================================================
*/

function destacarMarcador(id){

    removerDestaques();

    const elemento = document.querySelector(

        `[data-id="${id}"]`

    );

    if(!elemento){

        return;

    }

    elemento.classList.add(

        "marker-selecionado"

    );

}

/*
=========================================================
REMOVER DESTAQUES
=========================================================
*/

function removerDestaques(){

    document

        .querySelectorAll(".marker")

        .forEach(

            marker=>{

                marker.classList.remove(

                    "marker-selecionado"

                );

            }

        );

}

/*
=========================================================
ABRIR LOCAL
=========================================================
*/

function selecionarMarcador(id){

    const marcador = getMarcador(id);

    if(!marcador){

        return;

    }

    mapa.flyTo(

        marcador.getLatLng(),

        18,

        {

            animate:true,

            duration:CONFIG.animacao

        }

    );

    destacarMarcador(id);

    abrirPopup(marcador);

}

/*
=========================================================
VISIBILIDADE
=========================================================
*/

function mostrarMarcador(id){

    const marcador = getMarcador(id);

    if(!marcador){

        return;

    }

    if(marcador.tipo==="local"){

        camadaLocais.addLayer(marcador);

    }else{

        camadaComercios.addLayer(marcador);

    }

}

function ocultarMarcador(id){

    const marcador = getMarcador(id);

    if(!marcador){

        return;

    }

    if(marcador.tipo==="local"){

        camadaLocais.removeLayer(marcador);

    }else{

        camadaComercios.removeLayer(marcador);

    }

}
