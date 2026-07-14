/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
pesquisa.js
Versão 1.0
=========================================================
*/

/*
=========================================================
VARIÁVEIS
=========================================================
*/

let indicePesquisa = [];

let resultadosPesquisa = [];

let resultadoSelecionado = -1;

/*
=========================================================
INICIAR
=========================================================
*/

function iniciarPesquisa(){

    criarIndicePesquisa();

    configurarPesquisa();

}

/*
=========================================================
CRIAR ÍNDICE
=========================================================
*/

function criarIndicePesquisa(){

    indicePesquisa = [];

    locais.forEach(item=>{

        indicePesquisa.push(item);

    });

    comercios.forEach(item=>{

        indicePesquisa.push(item);

    });

    console.log(

        "Índice criado:",

        indicePesquisa.length,

        "registros"

    );

}

/*
=========================================================
NORMALIZAR TEXTO
=========================================================
*/

function normalizarTexto(texto){

    return texto

        .toLowerCase()

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g,"")

        .trim();

}
/*
=========================================================
DIGITAÇÃO
=========================================================
*/

searchInput.addEventListener(

    "input",

    pesquisar

);

/*
=========================================================
PESQUISAR
=========================================================
*/

function pesquisar(){

    const texto = normalizarTexto(

        searchInput.value

    );

    if(texto.length===0){

        limparResultados();

        return;

    }

    resultadosPesquisa = indicePesquisa.filter(

        item=>{

            return normalizarTexto(

                item.nome

            ).includes(texto);

        }

    );

    mostrarResultados();

}

/*
=========================================================
LIMPAR
=========================================================
*/

function limparResultados(){

    resultadosPesquisa=[];

    resultadoSelecionado=-1;

    removerListaResultados();

}
/*
=========================================================
MOSTRAR RESULTADOS
=========================================================
*/

function mostrarResultados(){

    removerListaResultados();

    if(resultadosPesquisa.length===0){

        return;

    }

    const lista = document.createElement("div");

    lista.id = "listaResultados";

    searchContainer.appendChild(lista);

    resultadosPesquisa.forEach((item,index)=>{

        const resultado = document.createElement("button");

        resultado.className = "resultadoPesquisa";

        resultado.innerHTML = `

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

        resultado.addEventListener(

            "click",

            ()=>{

                selecionarResultado(index);

            }

        );

        lista.appendChild(resultado);

    });

}

/*
=========================================================
REMOVER RESULTADOS
=========================================================
*/

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
SELECIONAR RESULTADO
=========================================================
*/

function selecionarResultado(indice){

    const item = resultadosPesquisa[indice];

    if(!item){

        return;

    }

    fecharPesquisa();

    localizarMarcador(item.id);

}

/*
=========================================================
ENTER
=========================================================
*/

searchInput.addEventListener(

    "keydown",

    e=>{

        if(e.key==="Enter"){

            e.preventDefault();

            if(resultadosPesquisa.length){

                selecionarResultado(0);

            }

        }

    }

);

/*
=========================================================
LIMPAR PESQUISA
=========================================================
*/

function limparPesquisa(){

    searchInput.value = "";

    limparResultados();

}

/*
=========================================================
ATUALIZAR ÍNDICE
=========================================================
*/

function atualizarIndicePesquisa(){

    criarIndicePesquisa();

}
