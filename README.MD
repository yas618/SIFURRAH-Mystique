# 🌐 Exercício de Acessibilidade Web - SIFURRAH

## 📚 Objetivo do Exercício

Este projeto contém uma versão **propositalmente problemática** de uma página web para você aprender a corrigir problemas de acessibilidade e semântica HTML. O arquivo index.html possui diversos erros que você deve identificar e corrigir.

## 🚨 Problemas Identificados no HTML

### 1. **Tags Semânticas Incorretas**
html
<!-- ❌ ERRADO -->
<div id="conteudo-principal">
    <div class="cabecalho-produto">
        <div class="secao-info">
        </div>
    </div>
</div>
<!-- ✅ CORRETO -->
    <main id="conteudo-principal" role="main">
        <header class="cabecalho-produto" role="banner">
            <section aria-labelledby="titulo-produto-info" class="secao-info"></section>
        </header>
    </main>

### 2. **Hierarquia de Headings Quebrada**
html
<!-- ❌ ERRADO - h5 antes de h1, h2 sem h1 -->
<h5 class="logo-sifurrah">SIFURRÁH</h5>
<h2 class="nome-perfume">Essencia DE SUVÁCU</h2>
<h1>Informações do Produto</h1>

<!-- ✅ CORRETO - hierarquia lógica -->
<h1 class="logo-sifurrah">SIFURRÁH</h1>
<h2 class="nome-perfume">Essencia DE SUVÁCU</h2>
<h2 id="titulo-produto-info">Informações do Produto</h2>

### 3. **Alt Text Genéricos e Não Descritivos**
html
<!-- ❌ ERRADO -->
<img src="..." alt="imagem" class="foto-produto" />
<img src="..." alt="foto" class="foto-cliente" />

<!-- ✅ CORRETO -->
<img src="..." alt="Frasco elegante do perfume Essencia de Suvãcu da SIFURRAH, em vidro dourado com design sofisticado, sobre fundo neutro" class="foto-produto" />
<img src="..." alt="Marc Nonno, cliente satisfeito da SIFURRAH" class="foto-cliente" />

### 4. **Formulários Sem Acessibilidade**
html
<!-- ❌ ERRADO - inputs sem labels -->
<span>Nome completo *</span>
<input type="text" id="nome" name="nome" required />

<!-- ✅ CORRETO - labels associados -->
<label for="nome">
    <span role="img" aria-label="Pessoa" aria-hidden="true">👤</span>
    Nome completo *
</label>
<input type="text" id="nome" name="nome" required aria-describedby="erro-nome" placeholder="Digite seu nome completo" aria-required="true" autocomplete="name" />

### 5. **Ordem Lógica dos Passos Quebrada**
html
<!-- ❌ ERRADO - Ordem: Passo 4 → 3 → 1 → 2 -->
<div class="passo-compra passo-4">...</div>
<div class="passo-compra passo-3">...</div>
<div class="passo-compra passo-1">...</div>
<div class="passo-compra passo-2">...</div>

<!-- ✅ CORRETO - Ordem lógica: 1 → 2 → 3 → 4 -->
<fieldset class="passo-compra passo-1">...</fieldset>
<fieldset class="passo-compra passo-2">...</fieldset>
<fieldset class="passo-compra passo-3">...</fieldset>
<fieldset class="passo-compra passo-4">...</fieldset>

## 🔧 Guia de Correção Completo

### **ARIA (Accessible Rich Internet Applications)**

#### **Atributos ARIA Essenciais:**
html
<!-- Role - Define o papel do elemento -->
<div role="banner">
    <!-- Cabeçalho principal -->
    <div role="navigation">
        <!-- Menu de navegação -->
        <div role="main">
            <!-- Conteúdo principal -->
            <div role="list">
                <!-- Lista -->
                <div role="listitem">
                    <!-- Item da lista -->
                    <div role="button">
                        <!-- Botão customizado -->
                        <div role="alert">
                            <!-- Mensagem de alerta -->
                            <div role="progressbar">
                                <!-- Barra de progresso -->
                                <div role="radiogroup">
                                    <!-- Grupo de radio buttons -->

                                    <!-- Aria-label - Rótulo acessível -->
                                    <button aria-label="Fechar modal">❌</button>
                                    <img aria-label="Produto em oferta" src="..." />

                                    <!-- Aria-labelledby - Referenciar outro elemento como rótulo -->
                                    <h2 id="titulo-secao">Produtos</h2>
                                    <div aria-labelledby="titulo-secao">...</div>

                                    <!-- Aria-describedby - Referenciar descrição adicional -->
                                    <input aria-describedby="ajuda-senha" type="password" />
                                    <div id="ajuda-senha">Deve ter pelo menos 8 caracteres</div>

                                    <!-- Aria-hidden - Ocultar de leitores de tela -->
                                    <span aria-hidden="true">🔥</span>
                                    <!-- Emoji decorativo -->

                                    <!-- Aria-expanded - Estado de elemento expansível -->
                                    <button aria-expanded="false" aria-controls="menu">Menu</button>
                                    <ul id="menu" aria-hidden="true">
                                        ...
                                    </ul>

                                    <!-- Aria-live - Anunciar mudanças dinâmicas -->
                                    <div aria-live="polite">Status atualizado</div>
                                    <!-- Anuncia quando possível -->
                                    <div aria-live="assertive">Erro crítico!</div>
                                    <!-- Anuncia imediatamente -->

                                    <!-- Aria-required - Campo obrigatório -->
                                    <input aria-required="true" type="email" />

                                    <!-- Aria-invalid - Campo com erro -->
                                    <input aria-invalid="true" aria-describedby="erro-email" />
                                    <div id="erro-email" role="alert">Email inválido</div>

                                    <!-- Aria-valuenow, aria-valuemin, aria-valuemax - Para barras de progresso -->
                                    <div role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">30% completo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

### **Tags Semânticas HTML5**
html
<!-- Estrutura Principal -->
<header>
    <!-- Cabeçalho da página ou seção -->
    <nav>
        <!-- Menu de navegação -->
        <main>
            <!-- Conteúdo principal da página -->
            <section>
                <!-- Seção temática -->
                <article>
                    <!-- Conteúdo independente -->
                    <aside>
                        <!-- Conteúdo lateral/complementar -->
                        <footer>
                            <!-- Rodapé da página ou seção -->

                            <!-- Conteúdo Específico -->
                            <figure>
                                <!-- Conteúdo ilustrativo -->
                                <img src="..." alt="..." />
                                <figcaption>Legenda da imagem</figcaption>
                            </figure>

                            <details>
                                <!-- Conteúdo expansível -->
                                <summary>Clique para expandir</summary>
                                <p>Conteúdo oculto...</p>
                            </details>

                            <time>
                                <!-- Data/hora -->
                                <time datetime="2024-12-30">30 de dezembro de 2024</time>
                            </time>

                            <mark>
                                <!-- Texto destacado -->
                                <address>
                                    <!-- Informações de contato -->
                                    <blockquote>
                                        <!-- Citação longa -->
                                        <cite>
                                            <!-- Citação inline -->
                                            <code>
                                                <!-- Código -->
                                                <kbd>
                                                    <!-- Tecla do teclado -->
                                                    <samp>
                                                        <!-- Saída de programa -->
                                                        <var> <!-- Variável --></var></samp
                                                    ></kbd
                                                ></code
                                            ></cite
                                        >
                                    </blockquote>
                                </address></mark
                            >
                        </footer>
                    </aside>
                </article>
            </section>
        </main>
    </nav>
</header>

### **Formulários Acessíveis**
html
<!-- Fieldset e Legend -->
<fieldset>
    <legend>Dados Pessoais</legend>
    <!-- campos relacionados -->
</fieldset>

<!-- Labels Corretas -->
<label for="email">E-mail:</label>
<input type="email" id="email" name="email" required />

<!-- Ou labels envolvendo -->
<label>
    Nome:
    <input type="text" name="nome" required />
</label>

<!-- Grupos de Radio/Checkbox -->
<fieldset>
    <legend>Tamanho do produto</legend>
    <div role="radiogroup" aria-required="true">
        <input type="radio" id="pequeno" name="tamanho" value="p" />
        <label for="pequeno">Pequeno</label>

        <input type="radio" id="medio" name="tamanho" value="m" />
        <label for="medio">Médio</label>

        <input type="radio" id="grande" name="tamanho" value="g" />
        <label for="grande">Grande</label>
    </div>
</fieldset>

<!-- Mensagens de Erro -->
<label for="senha">Senha:</label>
<input type="password" id="senha" aria-describedby="erro-senha" aria-invalid="true" />
<div id="erro-senha" role="alert" aria-live="polite">A senha deve ter pelo menos 8 caracteres</div>

### **Listas Semânticas**
html
<!-- Lista Não Ordenada -->
<ul role="list">
    <li role="listitem">Item 1</li>
    <li role="listitem">Item 2</li>
</ul>

<!-- Lista Ordenada -->
<ol role="list">
    <li role="listitem">Primeiro passo</li>
    <li role="listitem">Segundo passo</li>
</ol>

<!-- Lista de Definições -->
<dl>
    <dt>Termo 1:</dt>
    <dd>Definição do termo 1</dd>

    <dt>Termo 2:</dt>
    <dd>Definição do termo 2</dd>
</dl>

### **Navegação e Links**
html
<!-- Navegação Principal -->
<nav role="navigation" aria-label="Menu principal">
    <ul>
        <li><a href="#home" aria-current="page">Home</a></li>
        <li><a href="#produtos">Produtos</a></li>
        <li><a href="#contato">Contato</a></li>
    </ul>
</nav>

<!-- Links Descritivos -->
<!-- ❌ ERRADO -->
<a href="...">Clique aqui</a>
<a href="...">Saiba mais</a>

<!-- ✅ CORRETO -->
<a href="...">Baixar catálogo de produtos (PDF, 2MB)</a>
<a href="..." aria-label="Ler mais sobre acessibilidade web">Saiba mais</a>

### **Imagens Acessíveis**
html
<!-- Imagens Informativas -->
<img src="grafico.png" alt="Vendas aumentaram 40% no último trimestre" />

<!-- Imagens Decorativas -->
<img src="decoracao.png" alt="" role="presentation" />
<!-- ou -->
<img src="decoracao.png" aria-hidden="true" />

<!-- Imagens Complexas -->
<figure>
    <img src="grafico-complexo.png" alt="Gráfico de vendas por região" />
    <figcaption>O gráfico mostra que a região Sul teve 40% das vendas, Sudeste 35%, Nordeste 15%, Norte 7% e Centro-Oeste 3%.</figcaption>
</figure>

<!-- Imagens com Link -->
<a href="produto.html">
    <img src="produto.jpg" alt="Perfume Essence de Suvãcu - Ver detalhes do produto" />
</a>

### **Tabulação (Tabindex)**
html
<!-- Ordem natural (recomendado) -->
<input type="text" />
<!-- tabindex="0" implícito -->
<button>Enviar</button>
<!-- tabindex="0" implícito -->

<!-- Ordem customizada (usar com cuidado) -->
<input type="text" tabindex="1" />
<button tabindex="2">Enviar</button>
<input type="text" tabindex="3" />

<!-- Remover da navegação -->
<div tabindex="-1">Não focável via Tab</div>

<!-- Tornar focável via JavaScript -->
<div tabindex="0" role="button">Botão customizado</div>

### **Estados e Propriedades Dinâmicas**
html
<!-- Estados de Carregamento -->
<button aria-busy="true" aria-describedby="status">Carregando...</button>
<div id="status" aria-live="polite" aria-atomic="true">Processando pedido, aguarde...</div>

<!-- Estados de Seleção -->
<div role="listbox">
    <div role="option" aria-selected="true">Opção 1</div>
    <div role="option" aria-selected="false">Opção 2</div>
</div>

<!-- Estados de Expansão -->
<button aria-expanded="false" aria-controls="menu" aria-haspopup="true">Menu</button>
<ul id="menu" aria-hidden="true">
    <li><a href="#home">Home</a></li>
    <li><a href="#sobre">Sobre</a></li>
</ul>

## 📝 Lista de Verificação (Checklist)

### ✅ **Estrutura HTML**

  [ ] Usar <main> para conteúdo principal
  [ ] Usar <header> para cabeçalhos
  [ ] Usar <nav> para navegação
  [ ] Usar <section> para seções temáticas
  [ ] Usar <article> para conteúdo independente
  [ ] Usar <aside> para conteúdo lateral
  [ ] Usar <footer> para rodapés

### ✅ **Headings (h1-h6)**

  [ ] Apenas um <h1> por página
  [ ] Hierarquia lógica (h1 → h2 → h3...)
  [ ] Não pular níveis (h1 → h3 sem h2)
  [ ] Headings descritivos e únicos

### ✅ **Imagens**

  [ ] Alt text descritivo para imagens informativas
  [ ] Alt text vazio (alt="") para imagens decorativas
  [ ] Usar aria-hidden="true" para ícones decorativos
  [ ] Figcaption para descrições longas

### ✅ **Formulários**

  [ ] Todos os inputs têm labels associados
  [ ] Usar <fieldset> e <legend> para grupos
  [ ] Atributo required em campos obrigatórios
  [ ] Mensagens de erro com role="alert"
  [ ] Instruções com aria-describedby

### ✅ **Links e Navegação**

  [ ] Texto de link descritivo
  [ ] Evitar "clique aqui", "saiba mais"
  [ ] Usar aria-current="page" para página atual
  [ ] Links para arquivos indicam tipo e tamanho

### ✅ **ARIA**

  [ ] role para elementos customizados (Obs.: elementos semânticos nativos como <button>, <nav>, etc., não precisam de role a menos que estejam sendo substituídos ou repaginados por elementos customizados)
  [ ] aria-label apenas para elementos sem texto visível (não use se já houver texto visível, para evitar redundância e confusão em tecnologias assistivas)
  [ ] aria-labelledby para referenciar títulos (o elemento referenciado deve ter um id único e ser visível para os usuários, por exemplo: <h2 id="titulo-secao">Produtos</h2> e <div aria-labelledby="titulo-secao">...</div>)
  [ ] aria-describedby para descrições adicionais (a descrição deve ser relevante, concisa e o elemento referenciado deve existir no DOM)
  [ ] aria-hidden="true" para elementos decorativos (não use em elementos interativos, pois isso os remove da árvore de acessibilidade)
  [ ] aria-live para conteúdo dinâmico  
    > Use aria-live="polite" para atualizações que não sejam críticas e podem ser anunciadas quando o leitor de tela estiver ocioso; use aria-live="assertive" apenas para mensagens urgentes que precisam ser anunciadas imediatamente.  
    > Aplique aria-live somente em regiões cujo conteúdo muda dinamicamente e precisa ser comunicado a usuários de leitores de tela.

### ✅ **Foco e Teclado**

  [ ] Todos os elementos interativos são focáveis
  [ ] Ordem de tabulação lógica
  [ ] Indicadores de foco visíveis
  [ ] Navegação por teclado funcional

### ✅ **Cores e Contraste**

  [ ] Contraste mínimo 4.5:1 para texto normal
  [ ] Contraste mínimo 3:1 para texto grande
  [ ] Informação não transmitida apenas por cor
  [ ] Testado com simuladores de daltonismo

## 🛠️ **Ferramentas de Teste**

### **Extensões do Navegador:**

  **axe DevTools** - Análise automática de acessibilidade
  **WAVE** - Avaliação visual de acessibilidade
  **Lighthouse** - Auditoria completa incluindo acessibilidade
  **Colour Contrast Analyser** - Teste de contraste

### **Leitores de Tela para Teste:**

  **NVDA** (Windows) - Gratuito
  **JAWS** (Windows) - Pago
  **VoiceOver** (Mac/iOS) - Nativo
  **TalkBack** (Android) - Nativo

### **Teste Manual:**

  Navegar apenas com teclado (Tab, Enter, Espaço, setas)
  Testar com zoom até 200%
  Verificar com leitor de tela
  Simular diferentes deficiências visuais

## 🎯 **Tarefas do Exercício**

1. **Corrigir Tags Semânticas** (30 pontos)

    - Substituir <div> por tags semânticas apropriadas
    - Adicionar role quando necessário

2. **Arrumar Hierarquia de Headings** (20 pontos)

    - Estabelecer ordem lógica h1 → h2 → h3...
    - Garantir apenas um h1 por página

3. **Melhorar Alt Texts** (15 pontos)

    - Escrever descrições informativas e contextuais
    - Usar alt="" para imagens decorativas

4. **Tornar Formulário Acessível** (25 pontos)

    - Associar labels aos inputs
    - Adicionar fieldsets e legends
    - Implementar mensagens de erro acessíveis

5. **Corrigir Ordem dos Passos** (10 pontos)
    - Reorganizar na ordem lógica 1 → 2 → 3 → 4
    - Manter funcionalidade intacta

## 📖 **Recursos Adicionais**

  [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
  [MDN Web Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
  [WebAIM](https://webaim.org/)
  [A11y Project](https://www.a11yproject.com/)
  [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## 🏆 **Critérios de Avaliação**

  **Correção técnica** (40%) - Problemas identificados resolvidos
  **Implementação ARIA** (30%) - Uso correto de atributos ARIA
  **Semântica HTML** (20%) - Tags apropriadas para o contexto
  **Usabilidade** (10%) - Experiência do usuário melhorada

---

**💡 Dica:** Teste sua solução com um leitor de tela e navegação apenas por teclado. Se funcionar bem para esses casos, provavelmente está acessível para todos!


**🎨 Nota:** Mantenha todos os arquivos CSS e JavaScript inalterados. O foco é apenas na correção do HTML para melhorar acessibilidade e semântica.