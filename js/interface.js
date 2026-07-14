/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
interface.js
Versão 1.0
=========================================================
*/

function iniciarInterface(){

    configurarMenu();

    configurarPesquisa();

    configurarOverlay();

}

/*
=========================================================
MENU LATERAL
=========================================================
*/

function configurarMenu(){

    btnMenu.addEventListener("click",()=>{

        alternarSidebar();

    });

    btnCloseSidebar.addEventListener("click",()=>{

        fecharSidebar();

    });

}

/*
=========================================================
OVERLAY
=========================================================
*/

function configurarOverlay(){

    overlay.addEventListener("click",()=>{

        fecharSidebar();

    });

}

/*
=========================================================
PESQUISA
=========================================================
*/

function configurarPesquisa(){

    btnSearch.addEventListener("click",()=>{

        alternarPesquisa();

    });

    searchInput.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            fecharPesquisa();

        }

    });

    document.addEventListener("click",(e)=>{

        if(
            !searchContainer.contains(e.target) &&
            pesquisaAberta
        ){

            fecharPesquisa();

        }

    });

}

/*
=========================================================
BOTÕES
=========================================================
*/

btnLocate.addEventListener("click",()=>{

    if(typeof centralizarUsuario==="function"){

        centralizarUsuario();

    }

});

btnLayers.addEventListener("click",()=>{

    abrirSidebar();

});

btnSatellite.addEventListener("click",()=>{

    /*
    Futuramente aqui teremos:

    Satélite

    Híbrido

    Mapa Claro

    Mapa Escuro

    */

});

/*
=========================================================
TECLADO
=========================================================
*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        fecharSidebar();

        fecharPesquisa();

    }

});
