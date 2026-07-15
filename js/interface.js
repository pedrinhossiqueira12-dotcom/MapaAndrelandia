/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
interface.js
Versão 2.0
=========================================================
*/

/*
=========================================================
INICIAR
=========================================================
*/

function iniciarInterface(){

    configurarMenu();

    configurarPesquisa();

    configurarBotoes();

    configurarTeclado();

}

/*
=========================================================
MENU
=========================================================
*/

function configurarMenu(){

    if(btnMenu){

        btnMenu.addEventListener(

            "click",

            alternarSidebar

        );

    }

    if(btnCloseSidebar){

        btnCloseSidebar.addEventListener(

            "click",

            fecharSidebar

        );

    }

    if(overlay){

        overlay.addEventListener(

            "click",

            fecharSidebar

        );

    }

}

/*
=========================================================
PESQUISA
=========================================================
*/

function configurarPesquisa(){

    if(btnSearch){

        btnSearch.addEventListener(

            "click",

            alternarPesquisa

        );

    }

    if(searchInput){

        searchInput.addEventListener(

            "keydown",

            function(e){

                if(e.key==="Escape"){

                    fecharPesquisa();

                }

            }

        );

    }

    document.addEventListener(

        "click",

        function(e){

            if(

                !pesquisaAberta ||

                !searchContainer ||

                searchContainer.contains(e.target)

            ){

                return;

            }

            fecharPesquisa();

        }

    );

}

/*
=========================================================
BOTÕES
=========================================================
*/

function configurarBotoes(){

    if(btnLocate){

        btnLocate.addEventListener(

            "click",

            function(){

                if(

                    typeof centralizarUsuario==="function"

                ){

                    centralizarUsuario();

                }

            }

        );

    }

    if(btnLayers){

        btnLayers.addEventListener(

            "click",

            function(){

                fecharPesquisa();

                abrirSidebar();

            }

        );

    }

    if(btnSatellite){

        btnSatellite.addEventListener(

            "click",

            alternarModoMapa

        );

    }

}

/*
=========================================================
TECLADO
=========================================================
*/

function configurarTeclado(){

    document.addEventListener(

        "keydown",

        function(e){

            if(e.key!=="Escape"){

                return;

            }

            fecharSidebar();

            fecharPesquisa();

        }

    );

}
