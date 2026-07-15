/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
filtros.js
Versão 2.0
=========================================================
*/

/*
=========================================================
FILTROS
=========================================================
*/

const filtros = {

    turismo:true,

    comercios:true,

    categorias:new Set()

};

/*
=========================================================
INICIAR
=========================================================
*/

function iniciarFiltros(){

    criarCategorias();

    configurarFiltros();

    aplicarFiltros();

}

/*
=========================================================
CRIAR CATEGORIAS
=========================================================
*/

function criarCategorias(){

    filtros.categorias.clear();

    [...locais,...comercios].forEach(

        item=>{

            if(item.categoria){

                filtros.categorias.add(

                    item.categoria

                );

            }

        }

    );

}

/*
=========================================================
CONFIGURAR
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

        turismo.checked = filtros.turismo;

        turismo.addEventListener(

            "change",

            ()=>{

                filtros.turismo = turismo.checked;

                aplicarFiltros();

            }

        );

    }

    if(comercios){

        comercios.checked = filtros.comercios;

        comercios.addEventListener(

            "change",

            ()=>{

                filtros.comercios = comercios.checked;

                aplicarFiltros();

            }

        );

    }

}

/*
=========================================================
APLICAR
=========================================================
*/

function aplicarFiltros(){

    if(!grupoMarcadores){

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

                filtros.categorias.size>0 &&

                !filtros.categorias.has(

                    marcador.dados.categoria

                )

            ){

                visivel = false;

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
CATEGORIAS
=========================================================
*/

function ativarCategoria(categoria){

    filtros.categorias.add(

        categoria

    );

    aplicarFiltros();

}

function desativarCategoria(categoria){

    filtros.categorias.delete(

        categoria

    );

    aplicarFiltros();

}

function limparCategorias(){

    filtros.categorias.clear();

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

function mostrarTudo(){

    filtros.turismo = true;

    filtros.comercios = true;

    limparCategorias();

}

/*
=========================================================
RECARREGAR
=========================================================
*/

function atualizarFiltros(){

    criarCategorias();

    aplicarFiltros();

}
