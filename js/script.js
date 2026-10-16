
/* =========================================
   OLIMPÍADAS DE INVERNO
   JavaScript principal do site
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* 1. MODO ESCURO */

    const botaoModo = document.getElementById("modo-escuro");

    function atualizarTema() {
        const temaSalvo = localStorage.getItem("tema");
        document.body.classList.toggle("tema-escuro", temaSalvo === "escuro");

        if (botaoModo) {
            botaoModo.textContent =
                temaSalvo === "escuro" ? "Modo claro" : "Modo escuro";
        }
    }

    atualizarTema();

    if (botaoModo) {
        botaoModo.addEventListener("click", function () {
            const estaEscuro = document.body.classList.contains("tema-escuro");
            const novoTema = estaEscuro ? "claro" : "escuro";

            localStorage.setItem("tema", novoTema);
            atualizarTema();
        });
    }


    /* 2. FORMULÁRIO */

    const formulario = document.getElementById("formulario");
    const respostaFormulario = document.getElementById("resposta-formulario");

    if (formulario && respostaFormulario) {
        formulario.addEventListener("submit", function (event) {
            event.preventDefault();

            const nome = document.getElementById("nome")?.value.trim() || "";
            const email = document.getElementById("email")?.value.trim() || "";
            const campoIdade = document.getElementById("idade");
            const idade = Number(campoIdade?.value);
            const esporte = document.getElementById("esporte")?.value || "";
            const mensagem = document.getElementById("mensagem")?.value.trim() || "";

            if (!nome || !email || !esporte || !mensagem ||
                !campoIdade || campoIdade.value === "") {
                respostaFormulario.textContent = "Preencha todos os campos!";
                respostaFormulario.className = "mensagem-erro mt-3";
                return;
            }

            if (!Number.isInteger(idade) || idade < 10 || idade > 120) {
                respostaFormulario.textContent =
                    "A idade mínima é de 10 anos. Confira a idade informada.";
                respostaFormulario.className = "mensagem-erro mt-3";
                return;
            }

            if (!document.getElementById("email").checkValidity()) {
                respostaFormulario.textContent =
                    "Digite um endereço de e-mail válido.";
                respostaFormulario.className = "mensagem-erro mt-3";
                return;
            }

            respostaFormulario.textContent =
                "Obrigada, " + nome + "! Seu formulário foi preenchido com sucesso.";
            respostaFormulario.className = "mensagem-sucesso mt-3";

            formulario.reset();
        });
    }


    /* 3. CURIOSIDADES ALEATÓRIAS */

    const botaoCuriosidade = document.getElementById("botao-curiosidade");
    const textoCuriosidade = document.getElementById("texto-curiosidade");

    const curiosidades = [
        "Os primeiros Jogos Olímpicos de Inverno aconteceram em 1924, em Chamonix, na França.",
        "A Noruega terminou os Jogos de Pequim 2022 na primeira posição do quadro de medalhas.",
        "O snowboard é praticado com uma prancha sobre a neve.",
        "O hóquei no gelo é um esporte coletivo que utiliza tacos e um disco chamado puck.",
        "A patinação artística combina elementos técnicos com apresentações coreografadas.",
        "No curling, os jogadores deslizam pedras em direção a um alvo no gelo.",
        "A patinação de velocidade exige rapidez, equilíbrio e técnica.",
        "O esqui alpino inclui provas de descida em montanhas cobertas de neve.",
        "Os Jogos Olímpicos de Inverno reúnem modalidades praticadas na neve e no gelo.",
        "No biatlo, os atletas combinam esqui cross-country e tiro esportivo.",
        "Pequim, na China, sediou os Jogos Olímpicos de Inverno de 2022.",
        "No salto de esqui, os atletas procuram alcançar uma grande distância com uma boa execução."
    ];

    if (botaoCuriosidade && textoCuriosidade) {
        let ultimaCuriosidade = -1;

        botaoCuriosidade.addEventListener("click", function () {
            let numero;

            do {
                numero = Math.floor(Math.random() * curiosidades.length);
            } while (curiosidades.length > 1 && numero === ultimaCuriosidade);

            ultimaCuriosidade = numero;
            textoCuriosidade.textContent = curiosidades[numero];
        });
    }


    /* 4. PESQUISA DE ESPORTES */

    const pesquisaEsportes = document.getElementById("pesquisa-esportes");
    const itensEsportes = document.querySelectorAll(".item-esporte");

    if (pesquisaEsportes && itensEsportes.length > 0) {
        pesquisaEsportes.addEventListener("input", function () {
            const termo = pesquisaEsportes.value.toLowerCase().trim();

            itensEsportes.forEach(function (item) {
                const texto = item.textContent.toLowerCase();
                item.style.display = texto.includes(termo) ? "" : "none";
            });
        });
    }


    /* 5. TESTE: DESCUBRA SEU ESPORTE */

    const quiz = document.getElementById("quiz-esporte");
    const resultadoQuiz = document.getElementById("resultado-quiz");
    const botaoRefazer = document.getElementById("refazer-quiz");

    if (quiz && resultadoQuiz) {
        quiz.addEventListener("submit", function (event) {
            event.preventDefault();

            const respostas = new FormData(quiz);
            const atividade = respostas.get("atividade");
            const cenario = respostas.get("cenario");
            const competicao = respostas.get("competicao");

            if (!atividade || !cenario || !competicao) {
                resultadoQuiz.hidden = false;
                resultadoQuiz.textContent =
                    "Responda a todas as perguntas antes de descobrir seu resultado.";
                return;
            }

            const pontos = {
                velocidade: 0,
                equilibrio: 0,
                equipe: 0,
                aventura: 0
            };

            [atividade, cenario, competicao].forEach(function (tipo) {
                if (Object.prototype.hasOwnProperty.call(pontos, tipo)) {
                    pontos[tipo]++;
                }
            });

            const maiorPontuacao = Math.max(...Object.values(pontos));
            const empatados = Object.keys(pontos).filter(function (tipo) {
                return pontos[tipo] === maiorPontuacao;
            });

            const escolhido = empatados[
                Math.floor(Math.random() * empatados.length)
            ];

            const esportes = {
                velocidade: {
                    nome: "Patinação de velocidade",
                    descricao: "Você gosta de rapidez, desafios e competições intensas."
                },
                equilibrio: {
                    nome: "Patinação artística",
                    descricao: "Você valoriza coordenação, técnica e movimentos criativos."
                },
                equipe: {
                    nome: "Hóquei no gelo",
                    descricao: "Você gosta de cooperação, estratégia e trabalho em equipe."
                },
                aventura: {
                    nome: "Snowboard",
                    descricao: "Você gosta de aventura e de experimentar desafios diferentes."
                }
            };

            const esporteEscolhido = esportes[escolhido];
            const titulo = document.createElement("h3");
            titulo.textContent = "Seu esporte é: " + esporteEscolhido.nome + "!";

            const descricao = document.createElement("p");
            descricao.textContent = esporteEscolhido.descricao;

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
            botaoRefazer.addEventListener("click", function () {
                quiz.reset();
                resultadoQuiz.replaceChildren();
                resultadoQuiz.hidden = true;
            });
        }
    }

});
