// Menu responsivo: abre, fecha e recolhe depois que uma seção é selecionada.
const menuToggle = document.getElementById("menuToggle");
const menuPrincipal = document.getElementById("menuPrincipal");

function fecharMenu() {
    menuPrincipal.classList.remove("aberto");
    menuToggle.classList.remove("ativo");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
}

menuToggle.addEventListener("click", function () {
    const menuEstaAberto = menuPrincipal.classList.toggle("aberto");
    menuToggle.classList.toggle("ativo", menuEstaAberto);
    menuToggle.setAttribute("aria-expanded", String(menuEstaAberto));
    menuToggle.setAttribute("aria-label", menuEstaAberto ? "Fechar menu" : "Abrir menu");
});

menuPrincipal.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", fecharMenu);
});

// Filtros de categoria e busca textual da galeria de destinos.
const cardsDestinos = Array.from(document.querySelectorAll(".card-destino"));
const botoesFiltro = document.querySelectorAll(".filtro");
const campoBusca = document.getElementById("buscaDestino");
const limparBusca = document.getElementById("limparBusca");
const resultadoFiltro = document.getElementById("resultadoFiltro");
const semResultados = document.getElementById("semResultados");
let filtroAtual = "todos";

function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function atualizarDestinos() {
    const termo = normalizarTexto(campoBusca.value);
    let quantidadeVisivel = 0;

    cardsDestinos.forEach(function (card) {
        const categorias = card.dataset.categoria.split(" ");
        const conteudo = normalizarTexto(card.textContent + " " + card.dataset.nome);
        const combinaCategoria = filtroAtual === "todos" || categorias.includes(filtroAtual);
        const combinaBusca = termo === "" || conteudo.includes(termo);
        const deveExibir = combinaCategoria && combinaBusca;

        card.hidden = !deveExibir;
        if (deveExibir) quantidadeVisivel++;
    });

    resultadoFiltro.textContent = `Mostrando ${quantidadeVisivel} ${quantidadeVisivel === 1 ? "destino" : "destinos"}`;
    semResultados.hidden = quantidadeVisivel !== 0;
}

botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
        filtroAtual = botao.dataset.filtro;
        botoesFiltro.forEach(function (outroBotao) {
            const selecionado = outroBotao === botao;
            outroBotao.classList.toggle("ativo", selecionado);
            outroBotao.setAttribute("aria-pressed", String(selecionado));
        });
        atualizarDestinos();
    });
});

campoBusca.addEventListener("input", atualizarDestinos);
limparBusca.addEventListener("click", function () {
    campoBusca.value = "";
    atualizarDestinos();
    campoBusca.focus();
});

// Conteúdo dos modais. As informações são introdutórias e não substituem a consulta aos sites oficiais.
const destinosInfo = {
    lucerna: {
        nome: "Lucerna",
        descricao: "Lucerna combina um centro histórico charmoso com o cenário do Lago dos Quatro Cantões. É uma ótima parada para quem gosta de arquitetura, passeios tranquilos e paisagens junto à água.",
        destaques: "Ponte da Capela (Kapellbrücke), centro antigo, passeio pelo lago e excursões na região do Monte Pilatus ou Rigi.",
        epoca: "Primavera e verão favorecem os passeios ao ar livre; no inverno, a cidade também pode ser uma base para excursões na neve."
    },
    interlaken: {
        nome: "Interlaken",
        descricao: "Entre os lagos Thun e Brienz, Interlaken é uma base conhecida para explorar o Oberland Bernês e as paisagens da região de Jungfrau.",
        destaques: "Lago Thun, Lago Brienz, mirantes, trilhas e passeios de montanha nas redondezas.",
        epoca: "Verifique as condições das trilhas e dos teleféricos. O verão favorece caminhadas; o inverno traz atividades na neve nas áreas alpinas."
    },
    zermatt: {
        nome: "Zermatt",
        descricao: "Zermatt é uma vila alpina famosa pela paisagem do Matterhorn e pelo ambiente de montanha. É um destino procurado tanto para atividades de inverno quanto para excursões em outras estações.",
        destaques: "Matterhorn, Gornergrat, trilhas panorâmicas e áreas de esportes de inverno.",
        epoca: "O inverno atrai quem busca neve e esportes; nos meses mais quentes, há oportunidades para trilhas e passeios panorâmicos."
    },
    berna: {
        nome: "Berna",
        descricao: "A capital suíça preserva um centro medieval com arcadas, fontes e ruas históricas. A cidade antiga faz parte da lista de Patrimônio Mundial da UNESCO.",
        destaques: "Centro histórico, torre do relógio Zytglogge, Catedral de Berna, Parque dos Ursos e Jardim das Rosas.",
        epoca: "É uma boa opção para passeios urbanos durante todo o ano; em dias mais quentes, aproveite os parques e as margens do rio Aare."
    },
    genebra: {
        nome: "Genebra",
        descricao: "À beira do Lago Léman, Genebra combina uma atmosfera internacional com um centro histórico cheio de ruas estreitas, praças e parques.",
        destaques: "Jet d’Eau, centro histórico, Catedral de St. Pierre, jardins e região do Palais des Nations.",
        epoca: "Primavera e verão são agradáveis para explorar os parques, a orla e os passeios de barco pelo lago."
    },
    montreux: {
        nome: "Montreux",
        descricao: "Montreux fica em uma baía do Lago Léman, com uma orla conhecida e cenário alpino ao fundo. A cidade também é associada ao Montreux Jazz Festival.",
        destaques: "Passeio à beira do lago, Château de Chillon, estátua de Freddie Mercury e trem panorâmico GoldenPass.",
        epoca: "Verifique o calendário de eventos se quiser visitar durante o festival de jazz; primavera e verão favorecem a orla e os passeios pelo lago."
    },
    lugano: {
        nome: "Lugano",
        descricao: "No cantão de Ticino, Lugano combina influência cultural italiana, praças, parques e uma paisagem de lago cercada por montanhas.",
        destaques: "Lago de Lugano, Piazza della Riforma, Parco Ciani e mirantes do Monte Brè e Monte San Salvatore.",
        epoca: "A primavera e o outono podem ser boas épocas para caminhar; no verão, os passeios ao redor do lago ganham destaque."
    },
    lauterbrunnen: {
        nome: "Lauterbrunnen",
        descricao: "Lauterbrunnen está em um vale alpino conhecido por suas paredes rochosas, vilarejos e cachoeiras. É um dos lugares mais marcantes da região de Jungfrau.",
        destaques: "Cachoeira Staubbach, cachoeiras de Trümmelbach, vilarejos de Wengen e Mürren e excursões a Jungfraujoch.",
        epoca: "Verifique a abertura dos caminhos e atrações de montanha. Os meses mais quentes favorecem caminhadas; no inverno, a região oferece acesso a áreas de esportes na neve."
    },
    grindelwald: {
        nome: "Grindelwald",
        descricao: "Grindelwald é um vilarejo alpino com vista para a face norte do Eiger e ponto de partida para experiências na região de Jungfrau.",
        destaques: "Grindelwald First, Lago Bachalp, trilha Eiger Trail e excursões a Jungfraujoch.",
        epoca: "No verão, há trilhas e passeios panorâmicos; no inverno, a região se transforma em um destino de esportes na neve."
    }
};

// Modal acessível: devolve o foco ao botão que abriu a janela ao ser fechado.
const modal = document.getElementById("modal");
const fecharModal = document.getElementById("fecharModal");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");
const modalDestaques = document.getElementById("modalDestaques");
const modalEpoca = document.getElementById("modalEpoca");
let elementoAnterior = null;

function abrirModal(destino, botaoOrigem) {
    const informacoes = destinosInfo[destino];
    if (!informacoes) return;

    elementoAnterior = botaoOrigem;
    modalTitulo.textContent = informacoes.nome;
    modalTexto.textContent = informacoes.descricao;
    modalDestaques.textContent = informacoes.destaques;
    modalEpoca.textContent = informacoes.epoca;
    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-aberto");
    fecharModal.focus();
}

function encerrarModal() {
    if (!modal.classList.contains("aberto")) return;
    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-aberto");
    if (elementoAnterior) elementoAnterior.focus();
}

document.querySelectorAll(".btnSaibaMais").forEach(function (botao) {
    botao.addEventListener("click", function () {
        abrirModal(botao.dataset.destino, botao);
    });
});

fecharModal.addEventListener("click", encerrarModal);
modal.addEventListener("click", function (evento) {
    if (evento.target === modal) encerrarModal();
});
document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && modal.classList.contains("aberto")) {
        encerrarModal();
    } else if (evento.key === "Escape" && menuPrincipal.classList.contains("aberto")) {
        fecharMenu();
        menuToggle.focus();
    }

    // Mantém a navegação por teclado dentro do modal enquanto ele está aberto.
    if (evento.key === "Tab" && modal.classList.contains("aberto")) {
        evento.preventDefault();
        fecharModal.focus();
    }
});

// Atualiza o ano do rodapé.
document.getElementById("anoAtual").textContent = new Date().getFullYear();
