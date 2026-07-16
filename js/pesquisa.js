/*
=========================================================
MAPA INTERATIVO DE ANDRELÂNDIA
pesquisa.js
Versão 3.0
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

    if(!searchInput){

        return;

    }

    searchInput.addEventListener(

        "input",

        pesquisar

    );

    searchInput.addEventListener(

        "keydown",

        teclaPesquisa

    );

    document.addEventListener(

        "click",

        clicarForaPesquisa

    );

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

    return String(

        texto || ""

    )

    .normalize("NFD")

    .replace(

        /[\u0300-\u036f]/g,

        ""

    )

    .toLowerCase()

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

    resultadosPesquisa = indicePesquisa

        .filter(

            item=>{

                const conteudo = [

                    item.nome,

                    item.categoria,

                    item.endereco,

                    item.descricaoCurta,

                    item.descricao,

                    item.palavrasChave

                ]

                .join(" ")

                .toLowerCase();

                return normalizarTexto(

                    conteudo

                ).includes(

                    texto

                );

            }

        )

        .sort(

            (a,b)=>{

                const aInicio = normalizarTexto(

                    a.nome

                ).startsWith(

                    texto

                );

                const bInicio = normalizarTexto(

                    b.nome

                ).startsWith(

                    texto

                );

                return bInicio-aInicio;

            }

        )

        .slice(

            0,

            10

        );

    mostrarResultados();

}
/*
=========================================================
MOSTRAR RESULTADOS
=========================================================
*/

function mostrarResultados(){

    removerListaResultados();

    if(

        !searchContainer ||

        resultadosPesquisa.length===0

    ){

        return;

    }

    const lista = document.createElement(

        "div"

    );

    lista.id = "listaResultados";

    resultadosPesquisa.forEach(

        item=>{

            const botao = document.createElement(

                "button"

            );

            botao.type = "button";

            botao.className =

                "resultadoPesquisa";

            const icone =

                item.icone ||

                "padrao.svg";

            botao.innerHTML = `

                <div class="resultadoIcone">

                    <img

                        src="${CONFIG.caminhos.icones}${icone}"

                        alt=""

                        draggable="false">

                </div>

                <div class="resultadoTexto">

                    <strong>

                        ${escaparHTML(item.nome)}

                    </strong>

                    <span>

                        ${escaparHTML(item.categoria || "")}

                    </span>

                </div>

            `;

            botao.addEventListener(

                "click",

                ()=>{

                    selecionarResultado(

                        item

                    );

                }

            );

            lista.appendChild(

                botao

            );

        }

    );

    searchContainer.appendChild(

        lista

    );

}

/*
=========================================================
SELECIONAR RESULTADO
=========================================================
*/

function selecionarResultado(item){

    fecharPesquisa();

    limparResultados();

    if(

        typeof abrirMarcador==="function"

    ){

        abrirMarcador(

            item.id

        );

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

        resultadosPesquisa.length>0

    ){

        e.preventDefault();

        selecionarResultado(

            resultadosPesquisa[0]

        );

    }

}

/*
=========================================================
CLIQUE FORA
=========================================================
*/

function clicarForaPesquisa(e){

    if(

        !searchContainer

    ){

        return;

    }

    if(

        searchContainer.contains(

            e.target

        )

    ){

        return;

    }

    limparResultados();

}
/*
=========================================================
LIMPAR RESULTADOS
=========================================================
*/

function limparResultados(){

    resultadosPesquisa = [];

    removerListaResultados();

}

/*
=========================================================
REMOVER LISTA
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
ATUALIZAR ÍNDICE
=========================================================
*/

function atualizarIndicePesquisa(){

    criarIndicePesquisa();

    limparResultados();

}

/*
=========================================================
OBTER RESULTADOS
=========================================================
*/

function obterResultadosPesquisa(){

    return resultadosPesquisa;

}

/*
=========================================================
VERIFICAR PESQUISA
=========================================================
*/

function pesquisaAtiva(){

    return (

        searchInput &&

        searchInput.value.trim() !== ""

    );

}

/*
=========================================================
API
=========================================================
*/

window.pesquisaAPI = {

    pesquisar,

    atualizarIndicePesquisa,

    limparResultados,

    obterResultadosPesquisa,

    pesquisaAtiva

};

/*
=========================================================
FIM
=========================================================
*/
