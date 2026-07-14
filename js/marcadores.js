/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
marcadores.js
Versão 3.0
=========================================================
*/

/*
=========================================================
VARIÁVEIS
=========================================================
*/

let marcadorSelecionado = null;

let grupoMarcadores = null;

/*
=========================================================
INICIAR
=========================================================
*/

function iniciarMarcadores(){

    grupoMarcadores = L.layerGroup();

    grupoMarcadores.addTo(mapa);

    criarMarcadoresLocais();

    criarMarcadoresComercios();

}

/*
=========================================================
LOCAIS
=========================================================
*/

function criarMarcadoresLocais(){

    locais.forEach(

        local=>{

            criarMarcador(

                local,

                "local"

            );

        }

    );

}

/*
=========================================================
COMÉRCIOS
=========================================================
*/

function criarMarcadoresComercios(){

    comercios.forEach(

        comercio=>{

            criarMarcador(

                comercio,

                "comercio"

            );

        }

    );

}

/*
=========================================================
CRIAR MARCADOR
=========================================================
*/

function criarMarcador(

    dados,

    tipo

){

    const marcador = L.marker(

        [

            dados.latitude,

            dados.longitude

        ],

        {

            icon:criarIcone(

                dados

            )

        }

    );

    marcador.dados = dados;

    marcador.tipo = tipo;

    marcador.on(

        "click",

        ()=>{

            selecionarMarcador(

                marcador

            );

        }

    );

    marcador.addTo(

        grupoMarcadores

    );

    marcadores.push(

        marcador

    );

}
/*
=========================================================
ÍCONE PERSONALIZADO
=========================================================
*/

function criarIcone(dados){

    const icone =

        dados.icone

        ||

        CONFIG.caminhos.icones +

        "padrao.svg";

    return L.divIcon(

        {

            className:"marker-wrapper",

            html:`

                <div class="marker">

                    <div class="marker-shadow"></div>

                    <div class="marker-icon">

                        <img

                            src="${icone}"

                            alt="${dados.nome}"

                            draggable="false">

                    </div>

                </div>

            `,

            iconSize:[44,56],

            iconAnchor:[22,50],

            popupAnchor:[0,-42]

        }

    );

}

/*
=========================================================
SELECIONAR
=========================================================
*/

function selecionarMarcador(marcador){

    limparMarcadorSelecionado();

    marcadorSelecionado = marcador;

    const elemento = marcador.getElement();

    if(elemento){

        elemento

            .querySelector(".marker")

            .classList

            .add("marker-selecionado");

    }

    centralizarMapa(

        marcador.getLatLng().lat,

        marcador.getLatLng().lng,

        18

    );

    if(typeof abrirSheet==="function"){

        abrirSheet(

            marcador.dados

        );

    }

}

/*
=========================================================
LIMPAR SELEÇÃO
=========================================================
*/

function limparMarcadorSelecionado(){

    if(!marcadorSelecionado){

        return;

    }

    const elemento =

        marcadorSelecionado.getElement();

    if(elemento){

        elemento

            .querySelector(".marker")

            .classList

            .remove("marker-selecionado");

    }

    marcadorSelecionado = null;

}
/*
=========================================================
OBTER MARCADOR PELO ID
=========================================================
*/

function obterMarcador(id){

    return marcadores.find(

        marcador=>{

            return marcador.dados.id===id;

        }

    ) || null;

}

/*
=========================================================
SELECIONAR PELO ID
=========================================================
*/

function selecionarMarcadorPorId(id){

    const marcador = obterMarcador(id);

    if(!marcador){

        return;

    }

    selecionarMarcador(marcador);

}

/*
=========================================================
FILTRO POR CATEGORIA
=========================================================
*/

function atualizarMarcadoresCategorias(categorias){

    marcadores.forEach(

        marcador=>{

            const categoria = marcador.dados.categoria;

            if(categorias.includes(categoria)){

                if(!grupoMarcadores.hasLayer(marcador)){

                    grupoMarcadores.addLayer(marcador);

                }

            }else{

                if(grupoMarcadores.hasLayer(marcador)){

                    grupoMarcadores.removeLayer(marcador);

                }

            }

        }

    );

}

/*
=========================================================
MOSTRAR TIPO
=========================================================
*/

function mostrarTipo(tipo){

    marcadores.forEach(

        marcador=>{

            if(marcador.tipo!==tipo){

                return;

            }

            if(!grupoMarcadores.hasLayer(marcador)){

                grupoMarcadores.addLayer(marcador);

            }

        }

    );

}

/*
=========================================================
ESCONDER TIPO
=========================================================
*/

function esconderTipo(tipo){

    marcadores.forEach(

        marcador=>{

            if(marcador.tipo!==tipo){

                return;

            }

            if(grupoMarcadores.hasLayer(marcador)){

                grupoMarcadores.removeLayer(marcador);

            }

        }

    );

}

/*
=========================================================
MOSTRAR TODOS
=========================================================
*/

function mostrarTodosMarcadores(){

    marcadores.forEach(

        marcador=>{

            if(!grupoMarcadores.hasLayer(marcador)){

                grupoMarcadores.addLayer(marcador);

            }

        }

    );

}

/*
=========================================================
ESCONDER TODOS
=========================================================
*/

function esconderTodosMarcadores(){

    marcadores.forEach(

        marcador=>{

            if(grupoMarcadores.hasLayer(marcador)){

                grupoMarcadores.removeLayer(marcador);

            }

        }

    );

}
/*
=========================================================
ATUALIZAR ZOOM DOS MARCADORES
=========================================================
*/

function atualizarZoomMarcadores(){

    if(!mapa){

        return;

    }

    const zoom = mapa.getZoom();

    let escala = 1;

    if(zoom <= 14){

        escala = 0.82;

    }else if(zoom <= 15){

        escala = 0.90;

    }else if(zoom <= 16){

        escala = 1;

    }else if(zoom <= 17){

        escala = 1.08;

    }else if(zoom <= 18){

        escala = 1.15;

    }else{

        escala = 1.22;

    }

    marcadores.forEach(

        marcador=>{

            const elemento = marcador.getElement();

            if(!elemento){

                return;

            }

            const marker = elemento.querySelector(

                ".marker"

            );

            if(!marker){

                return;

            }

            if(marker.classList.contains("marker-selecionado")){

                return;

            }

            marker.style.transform =

                `scale(${escala})`;

        }

    );

}

/*
=========================================================
ATUALIZAR SELEÇÃO
=========================================================
*/

function atualizarMarcadorSelecionado(){

    if(!marcadorSelecionado){

        return;

    }

    if(

        !grupoMarcadores.hasLayer(

            marcadorSelecionado

        )

    ){

        limparMarcadorSelecionado();

    }

}

/*
=========================================================
PESQUISA
=========================================================
*/

function selecionarResultadoPesquisa(id){

    selecionarMarcadorPorId(id);

}

/*
=========================================================
LIMPAR
=========================================================
*/

function limparMarcadores(){

    limparMarcadorSelecionado();

    grupoMarcadores.clearLayers();

    marcadores.length = 0;

}

/*
=========================================================
RECARREGAR
=========================================================
*/

function recarregarMarcadores(){

    limparMarcadores();

    criarMarcadoresLocais();

    criarMarcadoresComercios();

    atualizarZoomMarcadores();

}

/*
=========================================================
EVENTOS
=========================================================
*/

if(typeof mapa !== "undefined"){

    document.addEventListener(

        "DOMContentLoaded",

        ()=>{

            if(mapa){

                mapa.on(

                    "zoomend",

                    atualizarZoomMarcadores

                );

            }

        }

    );

}
/*
=========================================================
ANIMAÇÃO
=========================================================
*/

function destacarMarcador(marcador){

    const elemento = marcador.getElement();

    if(!elemento){

        return;

    }

    const marker = elemento.querySelector(".marker");

    if(!marker){

        return;

    }

    marker.classList.remove("marker-animando");

    void marker.offsetWidth;

    marker.classList.add("marker-animando");

}

/*
=========================================================
ATUALIZAR MARCADOR
=========================================================
*/

function atualizarMarcador(id,dados){

    const marcador = obterMarcador(id);

    if(!marcador){

        return;

    }

    marcador.dados = {

        ...marcador.dados,

        ...dados

    };

}

/*
=========================================================
REMOVER MARCADOR
=========================================================
*/

function removerMarcador(id){

    const marcador = obterMarcador(id);

    if(!marcador){

        return;

    }

    grupoMarcadores.removeLayer(marcador);

    const indice = marcadores.indexOf(marcador);

    if(indice !== -1){

        marcadores.splice(indice,1);

    }

    if(marcadorSelecionado === marcador){

        limparMarcadorSelecionado();

    }

}

/*
=========================================================
ADICIONAR MARCADOR
=========================================================
*/

function adicionarMarcador(dados,tipo){

    criarMarcador(

        dados,

        tipo

    );

}

/*
=========================================================
CENTRALIZAR E SELECIONAR
=========================================================
*/

function abrirMarcador(id){

    const marcador = obterMarcador(id);

    if(!marcador){

        return;

    }

    selecionarMarcador(marcador);

    destacarMarcador(marcador);

}

/*
=========================================================
API
=========================================================
*/

window.marcadoresAPI={

    obterMarcador,

    abrirMarcador,

    adicionarMarcador,

    removerMarcador,

    atualizarMarcador,

    mostrarTipo,

    esconderTipo,

    mostrarTodosMarcadores,

    esconderTodosMarcadores

};

/*
=========================================================
FIM
=========================================================
*/
