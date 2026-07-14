/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
filtros.js
Versão 1.0
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

    aplicarFiltros();

}

/*
=========================================================
CRIAR CATEGORIAS
=========================================================
*/

function criarCategorias(){

    filtros.categorias.clear();

    locais.forEach(item=>{

        if(item.categoria){

            filtros.categorias.add(

                item.categoria

            );

        }

    });

    comercios.forEach(item=>{

        if(item.categoria){

            filtros.categorias.add(

                item.categoria

            );

        }

    });

}
/*
=========================================================
APLICAR
=========================================================
*/

function aplicarFiltros(){

    camadaLocais.clearLayers();

    camadaComercios.clearLayers();

    marcadores.forEach(marcador=>{

        const item = marcador.dados;

        if(item.visivel===false){

            return;

        }

        if(

            marcador.tipo==="local" &&

            filtros.turismo

        ){

            camadaLocais.addLayer(

                marcador

            );

        }

        if(

            marcador.tipo==="comercio" &&

            filtros.comercios

        ){

            camadaComercios.addLayer(

                marcador

            );

        }

    });

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

function ocultarTurismo(){

    filtros.turismo = false;

    aplicarFiltros();

}

function mostrarComercios(){

    filtros.comercios = true;

    aplicarFiltros();

}

function ocultarComercios(){

    filtros.comercios = false;

    aplicarFiltros();

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
