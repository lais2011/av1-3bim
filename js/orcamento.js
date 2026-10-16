
/* CALCULO DO ORCAMENTO */

let formOrcamento = document.querySelector("#form-orcamento");

if (formOrcamento != null) {
    formOrcamento.addEventListener("submit", function(event) {
        event.preventDefault();

        let passagem = document.querySelector("#passagem").value;
        let hospedagem = document.querySelector("#hospedagem").value;
        let alimentacao = document.querySelector("#alimentacao").value;
        let ingressos = document.querySelector("#ingressos").value;

        let resultado = document.querySelector("#resultado-orcamento");

        if (
            passagem === "" ||
            hospedagem === "" ||
            alimentacao === "" ||
            ingressos === ""
        ) {
            resultado.textContent = "Preencha todos os campos para calcular o orçamento.";
            resultado.className = "erro";
        } else {
            passagem = Number(passagem);
            hospedagem = Number(hospedagem);
            alimentacao = Number(alimentacao);
            ingressos = Number(ingressos);

            if (
                passagem < 0 ||
                hospedagem < 0 ||
                alimentacao < 0 ||
                ingressos < 0
            ) {
                resultado.textContent = "Digite valores iguais ou maiores que zero.";
                resultado.className = "erro";
            } else {
                let total = passagem + hospedagem + alimentacao + ingressos;

                let formatoMoeda = total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });

                resultado.innerHTML =
                    "<strong>Orçamento estimado</strong>" +
                    "<br>Passagens: " + passagem.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }) +
                    "<br>Hospedagem: " + hospedagem.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }) +
                    "<br>Alimentação: " + alimentacao.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }) +
                    "<br>Ingressos: " + ingressos.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    }) +
                    "<hr><strong>Total: " + formatoMoeda + "</strong>";

                resultado.className = "sucesso";
            }
        }
    });

    formOrcamento.addEventListener("reset", function() {
        let resultado = document.querySelector("#resultado-orcamento");

        resultado.textContent = "";
        resultado.className = "";
    });
}
