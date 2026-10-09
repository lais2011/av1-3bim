
/* Formulário */
const formulario = document.getElementById("formulario");
const resposta = document.getElementById("resposta-formulario");

if (formulario) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const idade = Number(document.getElementById("idade").value);
        const esporte = document.getElementById("esporte").value;
        const mensagem = document.getElementById("mensagem").value.trim();

        if (!nome || !email || !esporte || !mensagem ||
            document.getElementById("idade").value === "") {
            resposta.textContent = "Preencha todos os campos!";
            resposta.className = "mensagem-erro mt-3";
            return;
        }

        if (!Number.isInteger(idade) || idade < 10 || idade > 120) {
            resposta.textContent =
                "A idade mínima é de 10 anos. Confira a idade informada.";
            resposta.className = "mensagem-erro mt-3";
            return;
        }

        resposta.textContent =
            "Obrigada, " + nome + "! Seu formulário foi preenchido com sucesso.";
        resposta.className = "mensagem-sucesso mt-3";

        formulario.reset();
    });
}


/* Modo escuro salvo entre as páginas */
const botaoModo = document.getElementById("modo-escuro");

// Recupera o tema escolhido anteriormente
if (localStorage.getItem("tema") === "escuro") {
    document.body.classList.add("tema-escuro");
}

function atualizarBotaoModo() {
    if (botaoModo) {
        if (document.body.classList.contains("tema-escuro")) {
            botaoModo.textContent = "Modo claro";
        } else {
            botaoModo.textContent = "Modo escuro";
        }
    }
}

atualizarBotaoModo();

if (botaoModo) {
    botaoModo.addEventListener("click", function() {
        document.body.classList.toggle("tema-escuro");

        if (document.body.classList.contains("tema-escuro")) {
            localStorage.setItem("tema", "escuro");
        } else {
            localStorage.setItem("tema", "claro");
        }

        atualizarBotaoModo();
    });
}


/* Botão de curiosidades */
const botaoCuriosidade = document.getElementById("botao-curiosidade");
const textoCuriosidade = document.getElementById("texto-curiosidade");

const curiosidades = [
    "Os primeiros Jogos Olímpicos de Inverno aconteceram em 1924, na França.",
    "O snowboard combina equilíbrio, técnica e velocidade na neve.",
    "O hóquei no gelo é disputado por equipes em uma pista de gelo.",
    "A patinação artística combina movimentos esportivos e apresentações."
];

if (botaoCuriosidade && textoCuriosidade) {
    botaoCuriosidade.addEventListener("click", function() {
        const numero = Math.floor(Math.random() * curiosidades.length);
        textoCuriosidade.textContent = curiosidades[numero];
    });
}


/* Pesquisa de esportes */
const pesquisa = document.getElementById("pesquisa-esportes");
const listaEsportes = document.querySelectorAll(".item-esporte");

if (pesquisa && listaEsportes.length > 0) {
    pesquisa.addEventListener("input", function() {
        const termo = pesquisa.value.toLowerCase().trim();

        listaEsportes.forEach(function(item) {
            const nome = item.textContent.toLowerCase();
            item.style.display = nome.includes(termo) ? "" : "none";
        });
    });
}



const quiz = document.getElementById("quiz-esporte");
const resultadoQuiz = document.getElementById("resultado-quiz");
const botaoRefazer = document.getElementById("refazer-quiz");

if (quiz && resultadoQuiz) {

    quiz.addEventListener("submit", function(event) {
        event.preventDefault();

        const respostas = new FormData(quiz);
        const pontos = {
            velocidade: 0,
            equilibrio: 0,
            equipe: 0,
            aventura: 0
        };

        pontos[respostas.get("atividade")]++;
        pontos[respostas.get("cenario")]++;
        pontos[respostas.get("competicao")]++;

        const maiorPontuacao = Math.max(...Object.values(pontos));

        const empatados = Object.keys(pontos).filter(function(tipo) {
            return pontos[tipo] === maiorPontuacao;
        });

       
        const escolhido = empatados[
            Math.floor(Math.random() * empatados.length)
        ];

        const esportes = {
            velocidade: {
                nome: "Patinação de velocidade",
                descricao: "Você gosta de rapidez, desafios e competições intensas. Essa modalidade envolve velocidade e curvas em uma pista de gelo."
            },

            equilibrio: {
                nome: "Patinação artística",
                descricao: "Você valoriza coordenação, técnica e movimentos criativos. A patinação artística combina elementos esportivos e apresentações."
            },

            equipe: {
                nome: "Hóquei no gelo",
                descricao: "Você gosta de cooperação e estratégia. No hóquei no gelo, os jogadores trabalham em equipe para marcar gols."
            },

            aventura: {
                nome: "Snowboard",
                descricao: "Você gosta de aventura e de experimentar desafios. No snowboard, os atletas descem a neve sobre uma prancha."
            }
        };

        const esporte = esportes[escolhido];

        const titulo = document.createElement("h3");
        titulo.textContent = "Seu esporte é: " + esporte.nome + "!";

        const descricao = document.createElement("p");
        descricao.textContent = esporte.descricao;

        const observacao = document.createElement("small");
        observacao.textContent =
            "Resultado recreativo baseado nas suas respostas.";

        resultadoQuiz.replaceChildren(titulo, descricao, observacao);
        resultadoQuiz.hidden = false;

        resultadoQuiz.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });

    if (botaoRefazer) {
        botaoRefazer.addEventListener("click", function() {
            quiz.reset();
            resultadoQuiz.replaceChildren();
            resultadoQuiz.hidden = true;
        });
    }
}

/* Botão de curiosidades */

const botaoCuriosidade = document.getElementById("botao-curiosidade");
const textoCuriosidade = document.getElementById("texto-curiosidade");

const curiosidades = [
    "Os primeiros Jogos Olímpicos de Inverno aconteceram em 1924, em Chamonix, na França.",
    "A Noruega terminou os Jogos de Pequim 2022 na primeira posição do quadro geral de medalhas.",
    "O snowboard é praticado com uma prancha sobre a neve.",
    "O hóquei no gelo é um esporte coletivo que utiliza tacos e um disco chamado puck.",
    "Na patinação artística, os atletas são avaliados por elementos técnicos e pela apresentação.",
    "No curling, os jogadores deslizam pedras em direção a um alvo desenhado no gelo.",
    "A patinação de velocidade exige técnica, equilíbrio e rapidez.",
    "O esqui alpino inclui provas em que os atletas descem uma montanha passando por marcações.",
    "Os Jogos de Inverno reúnem modalidades praticadas na neve e no gelo.",
    "No biatlo, os atletas combinam esqui cross-country e tiro esportivo.",
    "A edição de 2022 dos Jogos Olímpicos de Inverno foi realizada em Pequim, na China.",
    "No salto de esqui, os atletas procuram alcançar a maior distância possível com uma boa execução."
];

if (botaoCuriosidade && textoCuriosidade) {
    let ultimaCuriosidade = -1;

    botaoCuriosidade.addEventListener("click", function() {
        let numero;

        do {
            numero = Math.floor(Math.random() * curiosidades.length);
        } while (
            curiosidades.length > 1 &&
            numero === ultimaCuriosidade
        );

        ultimaCuriosidade = numero;
        textoCuriosidade.textContent = curiosidades[numero];
    });
}