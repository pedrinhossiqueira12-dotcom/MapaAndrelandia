/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
filtros.js
Versão 3.0
=========================================================
*/

/*
=========================================================
ESTADO
=========================================================
*/

const filtros={

    turismo:true,

    comercios:true,

    categoriasDisponiveis:[],

    categoriasAtivas:new Set()

};

/*
=========================================================
INICIAR
=========================================================
*/

function iniciarFiltros(){

    criarCategorias();

    criarInterfaceCategorias();

    configurarFiltros();

    aplicarFiltros();

}

/*
=========================================================
CRIAR CATEGORIAS
=========================================================
*/

function criarCategorias(){

    const lista = new Set();

    [...locais,...comercios].forEach(

        item=>{

            if(item.categoria){

                lista.add(

                    item.categoria

                );

            }

        }

    );

    filtros.categoriasDisponiveis =

        [...lista].sort();

}
/*
=========================================================
CRIAR INTERFACE DAS CATEGORIAS
=========================================================
*/

function criarInterfaceCategorias(){

    const container = document.getElementById(

        "categoriasContainer"

    );

    if(!container){

        return;

    }

    container.innerHTML =

        "<h3>Categorias</h3>";

    filtros.categoriasDisponiveis.forEach(

        categoria=>{

            const item = document.createElement(

                "div"

            );

            item.className =

                "itemFiltro";

            item.innerHTML = `

                <span>

                    ${escaparHTML(categoria)}

                </span>

                <label class="switch">

                    <input

                        type="checkbox"

                        checked

                        data-categoria="${escaparHTML(categoria)}">

                    <span class="slider"></span>

                </label>

            `;

            const checkbox = item.querySelector(

                "input"

            );

            filtros.categoriasAtivas.add(

                categoria

            );

            checkbox.addEventListener(

                "change",

                ()=>{

                    if(

                        checkbox.checked

                    ){

                        filtros.categoriasAtivas.add(

                            categoria

                        );

                    }else{

                        filtros.categoriasAtivas.delete(

                            categoria

                        );

                    }

                    aplicarFiltros();

                }

            );

            container.appendChild(

                item

            );

        }

    );

}

/*
=========================================================
CONFIGURAR BOTÕES
=========================================================
*/

function configurarFiltros(){

    const turismo = document.getElementById(

        "toggleTurismo"

    );

    const comercios = document.getElementById(

        "toggleComercios"

    );

    if(turismo){

        turismo.checked =

            filtros.turismo;

        turismo.addEventListener(

            "change",

            ()=>{

                filtros.turismo =

                    turismo.checked;

                aplicarFiltros();

            }

        );

    }

    if(comercios){

        comercios.checked =

            filtros.comercios;

        comercios.addEventListener(

            "change",

            ()=>{

                filtros.comercios =

                    comercios.checked;

                aplicarFiltros();

            }

        );

    }

}
/*
=========================================================
APLICAR FILTROS
=========================================================
*/

function aplicarFiltros(){

    if(

        !grupoMarcadores

    ){

        return;

    }

    marcadores.forEach(

        marcador=>{

            let visivel = true;

            if(

                marcador.tipo==="local" &&

                !filtros.turismo

            ){

                visivel = false;

            }

            if(

                marcador.tipo==="comercio" &&

                !filtros.comercios

            ){

                visivel = false;

            }

            if(

                visivel &&

                filtros.categoriasAtivas.size>0

            ){

                visivel =

                    filtros.categoriasAtivas.has(

                        marcador.dados.categoria

                    );

            }

            if(visivel){

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

    atualizarMarcadorSelecionado();

}

/*
=========================================================
MOSTRAR TUDO
=========================================================
*/

function mostrarTudo(){

    filtros.turismo = true;

    filtros.comercios = true;

    filtros.categoriasAtivas.clear();

    filtros.categoriasDisponiveis.forEach(

        categoria=>{

            filtros.categoriasAtivas.add(

                categoria

            );

        }

    );

    document.querySelectorAll(

        "#categoriasContainer input"

    ).forEach(

        checkbox=>{

            checkbox.checked = true;

        }

    );

    aplicarFiltros();

}
/*
=========================================================
ATALHOS
=========================================================
*/

function mostrarTurismo(){

    filtros.turismo = true;

    aplicarFiltros();

}

function esconderTurismo(){

    filtros.turismo = false;

    aplicarFiltros();

}

function mostrarComercios(){

    filtros.comercios = true;

    aplicarFiltros();

}

function esconderComercios(){

    filtros.comercios = false;

    aplicarFiltros();

}

/*
=========================================================
CATEGORIAS
=========================================================
*/

function ativarCategoria(categoria){

    filtros.categoriasAtivas.add(

        categoria

    );

    aplicarFiltros();

}

function desativarCategoria(categoria){

    filtros.categoriasAtivas.delete(

        categoria

    );

    aplicarFiltros();

}

function limparCategorias(){

    filtros.categoriasAtivas.clear();

    aplicarFiltros();

}

/*
=========================================================
ATUALIZAR
=========================================================
*/

function atualizarFiltros(){

    criarCategorias();

    criarInterfaceCategorias();

    aplicarFiltros();

}

/*
=========================================================
API
=========================================================
*/

window.filtrosAPI = {

    aplicarFiltros,

    atualizarFiltros,

    mostrarTudo,

    mostrarTurismo,

    esconderTurismo,

    mostrarComercios,

    esconderComercios,

    ativarCategoria,

    desativarCategoria,

    limparCategorias

};

/*
=========================================================
FIM
=========================================================
*/
