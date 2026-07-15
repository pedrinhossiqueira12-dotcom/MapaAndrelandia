/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
pesquisa.js
Versão 2.0
=========================================================
*/

/*
=========================================================
VARIÁVEIS
=========================================================
*/

let indicePesquisa = [];

let resultadosPesquisa = [];

/*
=========================================================
INICIAR
=========================================================
*/

function iniciarPesquisa(){

    criarIndicePesquisa();

    if(searchInput){

        searchInput.addEventListener(

            "input",

            pesquisar

        );

        searchInput.addEventListener(

            "keydown",

            teclaPesquisa

        );

    }

}

/*
=========================================================
CRIAR ÍNDICE
=========================================================
*/

function criarIndicePesquisa(){

    indicePesquisa = [

        ...locais,

        ...comercios

    ];

}

/*
=========================================================
NORMALIZAR
=========================================================
*/

function normalizarTexto(texto){

    return String(texto || "")

        .toLowerCase()

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g,"")

        .trim();

}

/*
=========================================================
PESQUISAR
=========================================================
*/

function pesquisar(){

    if(!searchInput){

        return;

    }

    const texto = normalizarTexto(

        searchInput.value

    );

    if(!texto){

        limparResultados();

        return;

    }

    resultadosPesquisa = indicePesquisa.filter(

        item =>

            normalizarTexto(item.nome)

            .includes(texto)

    );

    mostrarResultados();

}

/*
=========================================================
RESULTADOS
=========================================================
*/

function mostrarResultados(){

    removerListaResultados();

    if(

        resultadosPesquisa.length===0 ||

        !searchContainer

    ){

        return;

    }

    const lista = document.createElement("div");

    lista.id = "listaResultados";

    resultadosPesquisa.forEach(

        item=>{

            const botao = document.createElement("button");

            botao.className = "resultadoPesquisa";

            botao.innerHTML = `

                <div class="resultadoIcone">

                    <img
                        src="${CONFIG.caminhos.icones}${item.icone}"
                        alt="">

                </div>

                <div class="resultadoTexto">

                    <strong>${item.nome}</strong>

                    <span>${item.categoria}</span>

                </div>

            `;

            botao.addEventListener(

                "click",

                ()=>{

                    selecionarResultado(item);

                }

            );

            lista.appendChild(botao);

        }

    );

    searchContainer.appendChild(lista);

}

/*
=========================================================
SELECIONAR
=========================================================
*/

function selecionarResultado(item){

    fecharPesquisa();

    limparResultados();

    if(

        typeof abrirMarcador==="function"

    ){

        abrirMarcador(item.id);

    }

}

/*
=========================================================
ENTER
=========================================================
*/

function teclaPesquisa(e){

    if(

        e.key==="Enter" &&

        resultadosPesquisa.length

    ){

        e.preventDefault();

        selecionarResultado(

            resultadosPesquisa[0]

        );

    }

}

/*
=========================================================
LIMPAR
=========================================================
*/

function limparResultados(){

    resultadosPesquisa = [];

    removerListaResultados();

}

function removerListaResultados(){

    const lista = document.getElementById(

        "listaResultados"

    );

    if(lista){

        lista.remove();

    }

}

/*
=========================================================
ATUALIZAR
=========================================================
*/

function atualizarIndicePesquisa(){

    criarIndicePesquisa();

}
