"use strict";



const MODO_CEGUEIRA = false;

let pedidoAtual = {
    tamanho: "50",
    preco: 299.9,
    quantidade: 1,
    total: 269.91,
};

const imagensTamanhos = {
    50: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=150&h=200&fit=crop&crop=center&q=90",
    75: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=150&h=200&fit=crop&crop=center&q=90",
    100: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=150&h=200&fit=crop&crop=center&q=90",
};

let passoAtual = 1;
const totalPassos = 4;




function anunciar(mensagem, urgente = false) {
    const regiaoId = urgente
        ? "urgent-announcements"
        : "screen-reader-announcements";

    const regiao = document.getElementById(regiaoId);

    if (regiao) {
        regiao.textContent = "";

        setTimeout(() => {
            regiao.textContent = mensagem;
        }, 100);

        setTimeout(() => {
            regiao.textContent = "";
        }, 5000);
    }

    console.log(`🔊 Anúncio: ${mensagem}`);
}


function anunciarStatus(mensagem) {
    const regiao = document.getElementById("status-announcements");

    if (!regiao) {
        return;
    }

    regiao.textContent = mensagem;

    setTimeout(() => {
        regiao.textContent = "";
    }, 3000);
}


function focarElemento(elemento) {
    if (!elemento) {
        return;
    }

    elemento.focus();

    if (typeof elemento.scrollIntoView === "function") {
        elemento.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }
}


function feedbackVisual(elemento, tipo = "sucesso") {
    if (!elemento) {
        return;
    }

    if (tipo === "sucesso") {
        elemento.style.transform = "scale(1.02)";
        elemento.style.transition = "transform 0.2s ease";
        elemento.style.boxShadow =
            "0 0 0 3px rgba(39, 174, 96, 0.3)";
    }

    if (tipo === "erro") {
        elemento.style.borderColor = "#e74c3c";
        elemento.style.backgroundColor = "#fdf2f2";
        elemento.style.boxShadow =
            "0 0 0 3px rgba(231, 76, 60, 0.3)";
    }

    setTimeout(() => {
        elemento.style.transform = "";
        elemento.style.boxShadow = "";

        if (tipo === "sucesso") {
            elemento.style.transition = "";
        }
    }, 300);
}


/*
 * ============================================================
 * MODO CEGUEIRA
 * ============================================================
 */

function aplicarModoCegueira() {
    if (!MODO_CEGUEIRA) {
        return;
    }

    document.documentElement.classList.add("modo-cegueira");

    const overlayExistente = document.getElementById(
        "modo-cegueira-overlay"
    );

    if (overlayExistente) {
        return;
    }

    const overlay = document.createElement("div");

    overlay.id = "modo-cegueira-overlay";

    overlay.setAttribute("aria-hidden", "true");

    overlay.style.cssText = `
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: #000000 !important;
        z-index: 2147483647 !important;
        pointer-events: none !important;
        display: block !important;
    `;

    document.body.appendChild(overlay);

    anunciar(
        "Modo cegueira total ativado. Tela completamente preta. Use Tab para navegar e Enter ou Espaço para interagir.",
        true
    );

    setTimeout(() => {
        const primeiroElementoFocavel = document.querySelector(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (primeiroElementoFocavel) {
            primeiroElementoFocavel.focus();
        }
    }, 1000);
}


/*
 * ============================================================
 * PREÇOS
 * ============================================================
 */

function formatarPreco(valor) {
    return Number(valor)
        .toFixed(2)
        .replace(".", ",");
}


function calcularPrecos() {
    const tamanhoSelecionado = document.querySelector(
        'input[name="tamanho"]:checked'
    );

    const quantidadeElemento =
        document.getElementById("quantidade");

    const pagamentoSelecionado = document.querySelector(
        'input[name="pagamento"]:checked'
    );

    if (!tamanhoSelecionado) {
        return null;
    }

    const quantidade = quantidadeElemento
        ? parseInt(quantidadeElemento.value, 10) || 1
        : 1;

    const precoUnitario = parseFloat(
        tamanhoSelecionado.dataset.preco
    );

    const subtotal = precoUnitario * quantidade;

    let desconto = 0;
    let totalAvista = subtotal;
    let textoDesconto = "R$ 0,00 (sem desconto)";

    if (
        pagamentoSelecionado &&
        pagamentoSelecionado.value === "pix"
    ) {
        desconto = subtotal * 0.1;
        totalAvista = subtotal - desconto;

        textoDesconto =
            `R$ ${formatarPreco(desconto)} (10%)`;
    }

    const parcelaMensal = subtotal / 6;

    pedidoAtual.tamanho = tamanhoSelecionado.value;
    pedidoAtual.preco = precoUnitario;
    pedidoAtual.quantidade = quantidade;
    pedidoAtual.total = totalAvista;

    const elementos = {
        "produto-selecionado":
            `Perfume Essence de Suvacu ${pedidoAtual.tamanho}ml`,

        "quantidade-selecionada":
            `${quantidade} ${
                quantidade === 1
                    ? "unidade"
                    : "unidades"
            }`,

        subtotal:
            `R$ ${formatarPreco(subtotal)}`,

        desconto:
            textoDesconto,

        "total-avista":
            `R$ ${formatarPreco(totalAvista)}`,

        parcelamento:
            `6x de R$ ${formatarPreco(parcelaMensal)} sem juros`,

        "valor-final":
            `R$ ${formatarPreco(totalAvista)}`,
    };

    Object.entries(elementos).forEach(
        ([id, valor]) => {
            const elemento =
                document.getElementById(id);

            if (!elemento) {
                return;
            }

            elemento.textContent = valor;

            if (id === "desconto") {
                if (
                    pagamentoSelecionado &&
                    pagamentoSelecionado.value === "pix"
                ) {
                    elemento.className =
                        "destaque-desconto";
                } else {
                    elemento.className =
                        "sem-desconto";
                }
            }

            if (
                id.includes("total") ||
                id.includes("valor")
            ) {
                feedbackVisual(
                    elemento,
                    "sucesso"
                );
            }
        }
    );


    const imagemResumo =
        document.getElementById("imagem-resumo");

    if (
        imagemResumo &&
        imagensTamanhos[pedidoAtual.tamanho]
    ) {
        imagemResumo.src =
            imagensTamanhos[pedidoAtual.tamanho];

        imagemResumo.alt =
            `Frasco do perfume Essence de Suvacu ${pedidoAtual.tamanho}ml selecionado no resumo do pedido`;
    }


    atualizarProgresso(2);

    return {
        subtotal,
        totalAvista,
        parcelaMensal,
        quantidade,
        tamanho: pedidoAtual.tamanho,
    };
}


/*
 * ============================================================
 * PROGRESSO
 * ============================================================
 */

function atualizarProgresso(passo) {
    passoAtual = Math.max(
        1,
        Math.min(passo, totalPassos)
    );

    const progresso =
        (passoAtual / totalPassos) * 100;

    const barraProgresso =
        document.querySelector(".progresso-atual");

    const textoProgresso =
        document.getElementById("passo-atual");

    const progressBar =
        document.querySelector(".progresso-form");

    if (barraProgresso) {
        barraProgresso.style.width =
            `${progresso}%`;
    }

    if (textoProgresso) {
        textoProgresso.textContent =
            passoAtual;
    }

    if (progressBar) {
        progressBar.setAttribute(
            "aria-valuenow",
            passoAtual
        );
    }

    anunciarStatus(
        `Progresso do formulário: passo ${passoAtual} de ${totalPassos}`
    );
}


/*
 * ============================================================
 * ALTERAÇÕES DO PEDIDO
 * ============================================================
 */

function aoMudarQuantidade() {
    const select =
        document.getElementById("quantidade");

    if (!select) {
        return;
    }

    const quantidade =
        parseInt(select.value, 10) || 1;

    calcularPrecos();

    feedbackVisual(
        select,
        "sucesso"
    );

    anunciar(
        `Quantidade alterada para ${quantidade} ${
            quantidade === 1
                ? "perfume"
                : "perfumes"
        }. Total recalculado.`
    );
}


function aoMudarTamanho(event) {
    const radio = event.target;

    if (!radio) {
        return;
    }

    const tamanho = radio.value;

    const preco = parseFloat(
        radio.dataset.preco
    );

    const label = document.querySelector(
        `label[for="${radio.id}"]`
    );

    calcularPrecos();

    if (label) {
        feedbackVisual(
            label,
            "sucesso"
        );
    }

    anunciar(
        `Tamanho selecionado: ${tamanho} mililitros. Preço unitário: R$ ${formatarPreco(
            preco
        )}. Resumo do pedido atualizado.`
    );

    atualizarProgresso(2);
}


function aoMudarPagamento(event) {
    const tipoPagamento =
        event.target.value;

    const label = document.querySelector(
        `label[for="${event.target.id}"]`
    );

    calcularPrecos();

    if (label) {
        feedbackVisual(
            label,
            "sucesso"
        );
    }

    let mensagem = "";

    if (tipoPagamento === "pix") {
        mensagem =
            "PIX selecionado. Desconto de 10% aplicado ao pagamento à vista.";
    } else if (tipoPagamento === "cartao") {
        mensagem =
            "Cartão de crédito selecionado. Parcelamento disponível sem juros.";
    } else if (tipoPagamento === "boleto") {
        mensagem =
            "Boleto bancário selecionado. Pagamento à vista sem desconto.";
    }

    anunciar(mensagem);
}


/*
 * ============================================================
 * VALIDAÇÃO
 * ============================================================
 */

function validarEmail(email) {
    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}


function validarCEP(cep) {
    const regex =
        /^\d{5}-?\d{3}$/;

    return regex.test(cep);
}


function mostrarErroCampo(
    campo,
    mensagem,
    erroElemento
) {
    campo.classList.add("erro");

    feedbackVisual(
        campo,
        "erro"
    );

    if (erroElemento) {
        erroElemento.textContent =
            mensagem;

        erroElemento.style.display =
            "block";

        erroElemento.setAttribute(
            "role",
            "alert"
        );

        campo.setAttribute(
            "aria-invalid",
            "true"
        );
    }
}


function limparErroCampo(
    campo,
    erroElemento
) {
    campo.classList.remove("erro");

    campo.removeAttribute(
        "aria-invalid"
    );

    if (erroElemento) {
        erroElemento.textContent = "";

        erroElemento.style.display =
            "none";

        erroElemento.removeAttribute(
            "role"
        );
    }
}


function validarCampo(campo) {
    if (!campo) {
        return true;
    }

    const valor =
        campo.value.trim();

    const ehObrigatorio =
        campo.hasAttribute("required");

    const label =
        document.querySelector(
            `label[for="${campo.id}"]`
        );

    const nome =
        label?.textContent
            ?.replace("*", "")
            ?.trim() ||
        "Campo";

    const erroElemento =
        document.getElementById(
            `erro-${campo.name}`
        );


    limparErroCampo(
        campo,
        erroElemento
    );


    if (
        ehObrigatorio &&
        !valor
    ) {
        mostrarErroCampo(
            campo,
            `${nome} é obrigatório e deve ser preenchido`,
            erroElemento
        );

        return false;
    }


    if (!valor) {
        return true;
    }


    if (
        campo.type === "email" &&
        !validarEmail(valor)
    ) {
        mostrarErroCampo(
            campo,
            "Por favor, digite um e-mail válido",
            erroElemento
        );

        return false;
    }


    if (
        campo.name === "cep" &&
        !validarCEP(valor)
    ) {
        mostrarErroCampo(
            campo,
            "CEP deve ter 8 dígitos no formato 00000-000",
            erroElemento
        );

        return false;
    }


    if (ehObrigatorio) {
        campo.style.borderColor =
            "#27ae60";

        campo.style.boxShadow =
            "0 0 0 2px rgba(39, 174, 96, 0.2)";

        setTimeout(() => {
            campo.style.borderColor = "";
            campo.style.boxShadow = "";
        }, 1000);
    }

    return true;
}


function validarFormulario() {
    const camposObrigatorios =
        document.querySelectorAll(
            "input[required]"
        );

    let camposValidos = 0;
    let primeiroCampoComErro = null;

    camposObrigatorios.forEach(
        (campo) => {
            const valido =
                validarCampo(campo);

            if (valido) {
                camposValidos++;
            } else if (
                !primeiroCampoComErro
            ) {
                primeiroCampoComErro =
                    campo;
            }
        }
    );


    const formularioValido =
        camposValidos ===
        camposObrigatorios.length;


    if (
        !formularioValido &&
        primeiroCampoComErro
    ) {
        const totalCampos =
            camposObrigatorios.length;

        const camposComErro =
            totalCampos -
            camposValidos;

        anunciar(
            `Atenção: ${camposComErro} ${
                camposComErro === 1
                    ? "campo obrigatório"
                    : "campos obrigatórios"
            } ${
                camposComErro === 1
                    ? "não foi preenchido"
                    : "não foram preenchidos"
            }. Focando no primeiro campo com erro.`,
            true
        );

        focarElemento(
            primeiroCampoComErro
        );

        atualizarProgresso(3);
    } else {
        atualizarProgresso(4);
    }

    return formularioValido;
}


/*
 * ============================================================
 * MÁSCARAS
 * ============================================================
 */

function aplicarMascaraCep(input) {
    let valor =
        input.value.replace(/\D/g, "");

    if (valor.length > 5) {
        valor = valor.replace(
            /^(\d{5})(\d)/,
            "$1-$2"
        );
    }

    input.value =
        valor.substring(0, 9);


    if (valor.length === 9) {
        input.style.borderColor =
            "#27ae60";

        input.style.boxShadow =
            "0 0 0 2px rgba(39, 174, 96, 0.2)";

        anunciarStatus(
            "CEP formatado corretamente"
        );

        setTimeout(() => {
            input.style.borderColor = "";
            input.style.boxShadow = "";
        }, 1000);
    }
}


function aplicarMascaraTelefone(input) {
    let valor =
        input.value.replace(/\D/g, "");

    if (valor.length > 11) {
        valor = valor.substring(
            0,
            11
        );
    }

    if (valor.length > 10) {
        valor = valor.replace(
            /^(\d{2})(\d{5})(\d{4})/,
            "($1) $2-$3"
        );
    } else if (valor.length > 6) {
        valor = valor.replace(
            /^(\d{2})(\d{4})(\d)/,
            "($1) $2-$3"
        );
    } else if (valor.length > 2) {
        valor = valor.replace(
            /^(\d{2})(\d)/,
            "($1) $2"
        );
    }

    input.value =
        valor;


    if (valor.length >= 14) {
        input.style.borderColor =
            "#27ae60";

        input.style.boxShadow =
            "0 0 0 2px rgba(39, 174, 96, 0.2)";

        anunciarStatus(
            "Telefone formatado corretamente"
        );

        setTimeout(() => {
            input.style.borderColor = "";
            input.style.boxShadow = "";
        }, 1000);
    }
}


/*
 * ============================================================
 * FINALIZAÇÃO DO PEDIDO
 * ============================================================
 */

function finalizarPedido() {
    anunciar(
        "Verificando todos os seus dados antes de finalizar..."
    );

    if (!validarFormulario()) {
        return;
    }

    const botao =
        document.getElementById(
            "finalizar-pedido"
        );

    if (!botao) {
        return;
    }

    botao.disabled = true;

    botao.innerHTML =
        `<span aria-hidden="true">⏳</span> PROCESSANDO PEDIDO...`;

    botao.style.background =
        "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)";

    botao.setAttribute(
        "aria-live",
        "polite"
    );

    anunciar(
        "Processando seu pedido. Aguarde alguns segundos, não feche a página.",
        true
    );

    botao.style.animation =
        "pulse 1s infinite";


    setTimeout(() => {
        mostrarSucesso();

        botao.style.animation =
            "";
    }, 3000);
}


function mostrarSucesso() {
    const main =
        document.querySelector("main");

    if (!main) {
        return;
    }

    const secoes =
        main.querySelectorAll(
            "section:not(#mensagem-sucesso)"
        );


    secoes.forEach(
        (secao, index) => {
            setTimeout(() => {

                secao.style.opacity =
                    "0";

                secao.style.transform =
                    "translateY(-20px)";

                secao.style.transition =
                    "all 0.3s ease";


                setTimeout(() => {
                    secao.style.display =
                        "none";
                }, 300);

            }, index * 100);
        }
    );


    const numeroPedido =
        "SIFU" +
        Math.floor(
            Math.random() * 99999
        )
            .toString()
            .padStart(5, "0");


    const numeroElemento =
        document.getElementById(
            "numero-pedido"
        );

    const totalElemento =
        document.getElementById(
            "total-pago"
        );


    if (numeroElemento) {
        numeroElemento.textContent =
            numeroPedido;
    }

    if (totalElemento) {
        totalElemento.textContent =
            `R$ ${formatarPreco(
                pedidoAtual.total
            )}`;
    }


    setTimeout(() => {

        const mensagemSucesso =
            document.getElementById(
                "mensagem-sucesso"
            );

        if (!mensagemSucesso) {
            return;
        }

        mensagemSucesso.classList.remove(
            "oculto"
        );

        mensagemSucesso.style.display =
            "block";

        mensagemSucesso.style.opacity =
            "0";

        mensagemSucesso.style.transform =
            "translateY(30px)";


        setTimeout(() => {

            mensagemSucesso.style.transition =
                "all 0.5s ease";

            mensagemSucesso.style.opacity =
                "1";

            mensagemSucesso.style.transform =
                "translateY(0)";

        }, 100);


        focarElemento(
            mensagemSucesso
        );


        anunciar(
            `Parabéns! Pedido realizado com sucesso! Número do pedido: ${numeroPedido}. Total pago: R$ ${formatarPreco(
                pedidoAtual.total
            )}. Você receberá seu perfume em 3 a 5 dias úteis. Um e-mail de confirmação será enviado com o código de rastreamento.`,
            true
        );

    }, 800);


    console.log(
        "🎉 Pedido finalizado:",
        pedidoAtual
    );
}


function novaCompra() {
    anunciar(
        "Recarregando página para nova compra..."
    );

    window.location.reload();
}


/*
 * ============================================================
 * EFEITOS VISUAIS
 * ============================================================
 */

function adicionarEfeitosVisuais() {

    const opcoesTamanho =
        document.querySelectorAll(
            ".opcao-tamanho"
        );


    opcoesTamanho.forEach(
        (opcao) => {

            opcao.addEventListener(
                "mouseenter",
                function () {

                    const input =
                        document.querySelector(
                            `#${this.getAttribute("for")}`
                        );

                    if (
                        input &&
                        !input.checked
                    ) {
                        this.style.transform =
                            "translateY(-2px)";

                        this.style.transition =
                            "transform 0.2s ease";
                    }
                }
            );


            opcao.addEventListener(
                "mouseleave",
                function () {

                    const input =
                        document.querySelector(
                            `#${this.getAttribute("for")}`
                        );

                    if (
                        input &&
                        !input.checked
                    ) {
                        this.style.transform =
                            "";
                    }
                }
            );

        }
    );


    const inputs =
        document.querySelectorAll(
            'input[type="text"], input[type="email"], input[type="tel"]'
        );


    inputs.forEach(
        (input) => {

            input.addEventListener(
                "focus",
                function () {

                    this.style.transform =
                        "scale(1.02)";

                    this.style.transition =
                        "transform 0.2s ease";

                    atualizarProgresso(3);
                }
            );


            input.addEventListener(
                "blur",
                function () {
                    this.style.transform =
                        "";
                }
            );

        }
    );
}


/*
 * ============================================================
 * IMAGENS
 * ============================================================
 */

function configurarFallbackImagens() {

    const miniFrascos =
        document.querySelectorAll(
            ".mini-frasco"
        );


    miniFrascos.forEach(
        (img) => {

            img.addEventListener(
                "error",
                function () {
                    this.style.display =
                        "none";

                    console.log(
                        `Imagem do frasco não carregou: ${this.alt}`
                    );
                }
            );


            img.addEventListener(
                "load",
                function () {
                    this.style.display =
                        "block";

                    console.log(
                        `Imagem do frasco carregada: ${this.alt}`
                    );
                }
            );

        }
    );


    const imagemPrincipal =
        document.querySelector(
            ".foto-produto"
        );


    if (imagemPrincipal) {

        imagemPrincipal.addEventListener(
            "error",
            function () {

                this.alt =
                    "Imagem do produto não disponível";

                this.style.background =
                    "#f8f9fa";

                console.log(
                    "Imagem principal não carregou"
                );
            }
        );

    }


    const fotosClientes =
        document.querySelectorAll(
            ".foto-cliente"
        );


    fotosClientes.forEach(
        (img) => {

            img.addEventListener(
                "error",
                function () {

                    this.style.display =
                        "none";

                    console.log(
                        `Foto do cliente não carregou: ${this.alt}`
                    );
                }
            );


            img.addEventListener(
                "load",
                function () {

                    this.style.display =
                        "block";

                    console.log(
                        `Foto do cliente carregada: ${this.alt}`
                    );
                }
            );

        }
    );
}


/*
 * ============================================================
 * NAVEGAÇÃO POR TECLADO
 * ============================================================
 */

function configurarNavegacaoTeclado() {

    document.addEventListener(
        "keydown",
        function (e) {

            if (e.key === "Tab") {
                document.body.classList.add(
                    "usando-teclado"
                );
            }


            if (e.key === "Escape") {

                const elementoFocado =
                    document.activeElement;

                if (
                    elementoFocado &&
                    typeof elementoFocado.blur ===
                        "function"
                ) {

                    elementoFocado.blur();

                    anunciarStatus(
                        "Foco removido do elemento atual"
                    );
                }
            }

        }
    );


    document.addEventListener(
        "mousedown",
        function () {
            document.body.classList.remove(
                "usando-teclado"
            );
        }
    );


    atualizarAnunciosFoco();
}


function atualizarAnunciosFoco() {

    const elementosFocaveis =
        document.querySelectorAll(
            'input, button, select, textarea, a, summary, [tabindex]:not([tabindex="-1"])'
        );


    elementosFocaveis.forEach(
        (elemento, index) => {

            elemento.addEventListener(
                "focus",
                function () {

                    if (
                        document.body.classList.contains(
                            "usando-teclado"
                        )
                    ) {

                        const texto =
                            this.getAttribute(
                                "aria-label"
                            ) ||
                            this.textContent
                                ?.trim()
                                ?.slice(0, 50) ||
                            this.tagName;


                        anunciarStatus(
                            `Elemento ${
                                index + 1
                            } de ${
                                elementosFocaveis.length
                            } focado: ${texto}`
                        );
                    }

                }
            );

        }
    );
}


/*
 * ============================================================
 * ATALHOS
 * ============================================================
 */

function configurarAtalhosTeclado() {

    document.addEventListener(
        "keydown",
        function (e) {

            if (
                e.altKey &&
                e.key === "1"
            ) {

                e.preventDefault();

                selecionarTamanho(
                    "tamanho-50ml",
                    "50ml"
                );
            }


            if (
                e.altKey &&
                e.key === "2"
            ) {

                e.preventDefault();

                selecionarTamanho(
                    "tamanho-75ml",
                    "75ml"
                );
            }


            if (
                e.altKey &&
                e.key === "3"
            ) {

                e.preventDefault();

                selecionarTamanho(
                    "tamanho-100ml",
                    "100ml"
                );
            }


            if (
                e.ctrlKey &&
                e.key === "Enter"
            ) {

                e.preventDefault();

                const botaoFinalizar =
                    document.getElementById(
                        "finalizar-pedido"
                    );

                if (
                    botaoFinalizar &&
                    !botaoFinalizar.disabled
                ) {

                    finalizarPedido();

                    anunciar(
                        "Pedido finalizado via atalho Ctrl+Enter"
                    );
                }
            }

        }
    );
}


function selecionarTamanho(
    id,
    nome
) {

    const elemento =
        document.getElementById(id);

    if (!elemento) {
        return;
    }

    elemento.checked = true;

    elemento.dispatchEvent(
        new Event("change", {
            bubbles: true,
        })
    );

    focarElemento(elemento);

    anunciar(
        `Tamanho ${nome} selecionado via atalho`
    );
}


/*
 * ============================================================
 * CONTRASTE
 * ============================================================
 */

function verificarContrasteCompliance() {

    const elementosTexto =
        document.querySelectorAll(
            "p, span, div, a, button, label, h1, h2, h3, h4, h5, h6"
        );


    elementosTexto.forEach(
        (elemento) => {

            const estilos =
                getComputedStyle(
                    elemento
                );

            const corTexto =
                estilos.color;

            const corFundo =
                estilos.backgroundColor;


            if (
                corTexto &&
                corFundo &&
                corFundo !==
                    "rgba(0, 0, 0, 0)"
            ) {

                const contraste =
                    calcularContraste(
                        corTexto,
                        corFundo
                    );


                if (contraste < 4.5) {

                    console.warn(
                        `Contraste insuficiente detectado: ${contraste.toFixed(
                            2
                        )}:1`,
                        elemento
                    );
                }
            }

        }
    );
}


function calcularContraste(
    cor1,
    cor2
) {

    const rgb1 =
        extrairRGB(cor1);

    const rgb2 =
        extrairRGB(cor2);


    const luminancia1 =
        calcularLuminancia(rgb1);

    const luminancia2 =
        calcularLuminancia(rgb2);


    const luminanciaClara =
        Math.max(
            luminancia1,
            luminancia2
        );

    const luminanciaEscura =
        Math.min(
            luminancia1,
            luminancia2
        );


    return (
        (luminanciaClara + 0.05) /
        (luminanciaEscura + 0.05)
    );
}


function extrairRGB(cor) {

    const match =
        cor.match(/\d+/g);

    return match
        ? match
            .slice(0, 3)
            .map(Number)
        : [0, 0, 0];
}


function calcularLuminancia(
    [r, g, b]
) {

    const [rs, gs, bs] =
        [r, g, b].map(
            (c) => {

                c = c / 255;

                return c <= 0.03928
                    ? c / 12.92
                    : Math.pow(
                        (c + 0.055) /
                            1.055,
                        2.4
                    );
            }
        );


    return (
        0.2126 * rs +
        0.7152 * gs +
        0.0722 * bs
    );
}


/*
 * ============================================================
 * INICIALIZAÇÃO
 * ============================================================
 */

function inicializar() {

    console.log(
        "🚀 Iniciando SIFURRAH Acessível + Visual..."
    );


    aplicarModoCegueira();


    /*
     * Tamanhos
     */
    const radiosTamanho =
        document.querySelectorAll(
            'input[name="tamanho"]'
        );


    radiosTamanho.forEach(
        (radio) => {

            radio.addEventListener(
                "change",
                aoMudarTamanho
            );

        }
    );


    /*
     * Quantidade
     */
    const selectQuantidade =
        document.getElementById(
            "quantidade"
        );


    if (selectQuantidade) {

        selectQuantidade.addEventListener(
            "change",
            aoMudarQuantidade
        );

    }


    /*
     * Pagamento
     */
    const radiosPagamento =
        document.querySelectorAll(
            'input[name="pagamento"]'
        );


    radiosPagamento.forEach(
        (radio) => {

            radio.addEventListener(
                "change",
                aoMudarPagamento
            );

        }
    );


    /*
     * Campos obrigatórios
     */
    const camposObrigatorios =
        document.querySelectorAll(
            "input[required]"
        );


    camposObrigatorios.forEach(
        (campo) => {

            campo.addEventListener(
                "blur",
                () => validarCampo(campo)
            );


            campo.addEventListener(
                "input",
                () => {

                    if (
                        campo.classList.contains(
                            "erro"
                        )
                    ) {

                        validarCampo(
                            campo
                        );
                    }

                }
            );

        }
    );


    /*
     * CEP
     */
    const campoCep =
        document.getElementById(
            "cep"
        );


    if (campoCep) {

        campoCep.addEventListener(
            "input",
            () => aplicarMascaraCep(
                campoCep
            )
        );

    }


    /*
     * Telefone
     */
    const campoTelefone =
        document.getElementById(
            "telefone"
        );


    if (campoTelefone) {

        campoTelefone.addEventListener(
            "input",
            () => aplicarMascaraTelefone(
                campoTelefone
            )
        );

    }


    /*
     * Botão finalizar
     */
    const botaoFinalizar =
        document.getElementById(
            "finalizar-pedido"
        );


    if (botaoFinalizar) {

        botaoFinalizar.addEventListener(
            "click",
            finalizarPedido
        );

    }


    /*
     * Outros recursos
     */
    adicionarEfeitosVisuais();
    configurarFallbackImagens();
    configurarNavegacaoTeclado();
    configurarAtalhosTeclado();


    /*
     * Inicialização dos valores
     */
    calcularPrecos();
    atualizarProgresso(1);


    /*
     * Anúncio inicial
     */
    setTimeout(() => {

        anunciar(
            "Página da SIFURRAH carregada com sucesso. Perfume Essence de Suvacu disponível com oferta especial de 10% de desconto à vista no PIX. Use Tab para navegar, Alt+1, Alt+2 ou Alt+3 para selecionar tamanhos rapidamente e Ctrl+Enter para finalizar o pedido."
        );


        if (!MODO_CEGUEIRA) {
            verificarContrasteCompliance();
        }

    }, 1000);


    /*
     * Details / informações adicionais
     */
    const detailsElementos =
        document.querySelectorAll(
            "details"
        );


    detailsElementos.forEach(
        (details) => {

            details.addEventListener(
                "toggle",
                function () {

                    if (!this.open) {
                        return;
                    }

                    const summary =
                        this.querySelector(
                            "summary"
                        );

                    anunciar(
                        `Seção expandida: ${
                            summary?.textContent ||
                            "Informações adicionais"
                        }`
                    );
                }
            );

        }
    );


    console.log(
        "✅ SIFURRAH Acessível + Visual inicializada com sucesso"
    );
}


document.addEventListener(
    "DOMContentLoaded",
    inicializar
);

window.finalizarPedido =
    finalizarPedido;

window.novaCompra =
    novaCompra;