/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
marcadores.js
Versão 4.0
=========================================================
*/

/*
=========================================================
VARIÁVEIS
=========================================================
*/

grupoMarcadores = L.layerGroup();

let marcadorSelecionado = null;

/*
=========================================================
INICIAR
=========================================================
*/

function iniciarMarcadores(){

    grupoMarcadores = L.layerGroup();

    grupoMarcadores.addTo(

        mapa

    );

    criarMarcadoresLocais();

    criarMarcadoresComercios();

    atualizarZoomMarcadores();

}

/*
=========================================================
CRIAR TODOS
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

    if(

        !coordenadasValidas(

            dados.latitude,

            dados.longitude

        )

    ){

        return;

    }

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
ÍCONE
=========================================================
*/

function criarIcone(dados){

    const arquivo =

        dados.icone

            ? dados.icone

            : "padrao.svg";

    return L.divIcon(

        {

            className:"marker-wrapper",

            iconSize:[44,56],

            iconAnchor:[22,50],

            popupAnchor:[0,-42],

            html:`

                <div class="marker">

                    <div class="marker-shadow"></div>

                    <div class="marker-icon">

                        <img

                            src="${CONFIG.caminhos.icones}${arquivo}"

                            alt="${escaparHTML(dados.nome)}"

                            draggable="false">

                    </div>

                </div>

            `

        }

    );

}
/*
=========================================================
SELECIONAR MARCADOR
=========================================================
*/

function selecionarMarcador(marcador){

    limparMarcadorSelecionado();

    marcadorSelecionado = marcador;

    const elemento = marcador.getElement();

    if(elemento){

        const marker = elemento.querySelector(

            ".marker"

        );

        if(marker){

            marker.classList.add(

                "marker-selecionado"

            );

        }

    }

    destacarMarcador(

        marcador

    );

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

        const marker = elemento.querySelector(

            ".marker"

        );

        if(marker){

            marker.classList.remove(

                "marker-selecionado"

            );

        }

    }

    marcadorSelecionado = null;

}

/*
=========================================================
DESTACAR
=========================================================
*/

function destacarMarcador(marcador){

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

    marker.classList.remove(

        "marker-animando"

    );

    void marker.offsetWidth;

    marker.classList.add(

        "marker-animando"

    );

}

/*
=========================================================
OBTER MARCADOR
=========================================================
*/

function obterMarcador(id){

    return marcadores.find(

        marcador=>

            marcador.dados.id===id

    ) || null;

}

/*
=========================================================
ABRIR PELO ID
=========================================================
*/

function selecionarMarcadorPorId(id){

    const marcador = obterMarcador(id);

    if(!marcador){

        return;

    }

    selecionarMarcador(

        marcador

    );

}

/*
=========================================================
PESQUISA
=========================================================
*/

function selecionarResultadoPesquisa(id){

    selecionarMarcadorPorId(

        id

    );

}

/*
=========================================================
VERIFICAR SELEÇÃO
=========================================================
*/

function atualizarMarcadorSelecionado(){

    if(

        !marcadorSelecionado

    ){

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
MOSTRAR TIPO
=========================================================
*/

function mostrarTipo(tipo){

    marcadores.forEach(

        marcador=>{

            if(

                marcador.tipo!==tipo

            ){

                return;

            }

            if(

                !grupoMarcadores.hasLayer(

                    marcador

                )

            ){

                grupoMarcadores.addLayer(

                    marcador

                );

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

            if(

                marcador.tipo!==tipo

            ){

                return;

            }

            if(

                grupoMarcadores.hasLayer(

                    marcador

                )

            ){

                grupoMarcadores.removeLayer(

                    marcador

                );

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

            if(

                !grupoMarcadores.hasLayer(

                    marcador

                )

            ){

                grupoMarcadores.addLayer(

                    marcador

                );

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

            if(

                grupoMarcadores.hasLayer(

                    marcador

                )

            ){

                grupoMarcadores.removeLayer(

                    marcador

                );

            }

        }

    );

}

/*
=========================================================
FILTRO POR CATEGORIA
=========================================================
*/

function atualizarMarcadoresCategorias(

    categorias

){

    marcadores.forEach(

        marcador=>{

            const categoria =

                marcador.dados.categoria;

            const mostrar =

                categorias.includes(

                    categoria

                );

            if(

                mostrar

            ){

                if(

                    !grupoMarcadores.hasLayer(

                        marcador

                    )

                ){

                    grupoMarcadores.addLayer(

                        marcador

                    );

                }

            }else{

                if(

                    grupoMarcadores.hasLayer(

                        marcador

                    )

                ){

                    grupoMarcadores.removeLayer(

                        marcador

                    );

                }

            }

        }

    );

}

/*
=========================================================
ZOOM DOS MARCADORES
=========================================================
*/

function atualizarZoomMarcadores(){

    if(

        !mapa

    ){

        return;

    }

    const zoom = mapa.getZoom();

    let escala = 1;

    if(zoom<=14){

        escala = 0.82;

    }

    else if(zoom<=15){

        escala = 0.90;

    }

    else if(zoom<=16){

        escala = 1.00;

    }

    else if(zoom<=17){

        escala = 1.08;

    }

    else if(zoom<=18){

        escala = 1.15;

    }

    else{

        escala = 1.22;

    }

    marcadores.forEach(

        marcador=>{

            const elemento =

                marcador.getElement();

            if(

                !elemento

            ){

                return;

            }

            const marker =

                elemento.querySelector(

                    ".marker"

                );

            if(

                !marker

            ){

                return;

            }

            if(

                marker.classList.contains(

                    "marker-selecionado"

                )

            ){

                return;

            }

            marker.style.transform =

                `scale(${escala})`;

        }

    );

}
/*
=========================================================
LIMPAR MARCADORES
=========================================================
*/

function limparMarcadores(){

    limparMarcadorSelecionado();

    if(grupoMarcadores){

        grupoMarcadores.clearLayers();

    }

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
ADICIONAR
=========================================================
*/

function adicionarMarcador(

    dados,

    tipo

){

    criarMarcador(

        dados,

        tipo

    );

}

/*
=========================================================
ATUALIZAR
=========================================================
*/

function atualizarMarcador(

    id,

    dados

){

    const marcador = obterMarcador(

        id

    );

    if(!marcador){

        return;

    }

    marcador.dados = {

        ...marcador.dados,

        ...dados

    };

    marcador.setIcon(

        criarIcone(

            marcador.dados

        )

    );

}

/*
=========================================================
REMOVER
=========================================================
*/

function removerMarcador(id){

    const marcador = obterMarcador(

        id

    );

    if(!marcador){

        return;

    }

    grupoMarcadores.removeLayer(

        marcador

    );

    const indice = marcadores.indexOf(

        marcador

    );

    if(indice !== -1){

        marcadores.splice(

            indice,

            1

        );

    }

    if(

        marcadorSelecionado === marcador

    ){

        limparMarcadorSelecionado();

    }

}

/*
=========================================================
ABRIR
=========================================================
*/

function abrirMarcador(id){

    const marcador = obterMarcador(

        id

    );

    if(!marcador){

        return;

    }

    selecionarMarcador(

        marcador

    );

}

/*
=========================================================
API
=========================================================
*/

window.marcadoresAPI = {

    obterMarcador,

    abrirMarcador,

    adicionarMarcador,

    atualizarMarcador,

    removerMarcador,

    mostrarTipo,

    esconderTipo,

    mostrarTodosMarcadores,

    esconderTodosMarcadores,

    atualizarMarcadoresCategorias,

    recarregarMarcadores

};

/*
=========================================================
FIM
=========================================================
*/
