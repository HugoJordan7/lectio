# Relatório de Avaliação Heurística — Lectio (Projeto 1)
Autor: Hugo
Data: 25/07/2026
Score Lighthouse (Acessibilidade): 89 / 100

---

## Problema 1
- **Onde:** Toda a aplicação — criação de livro, remoção, carregamento inicial
- **O que observei:** Nenhuma operação exibe feedback de carregamento. Ao clicar em "Salvar" no modal ou em remover um livro, o botão permanece ativo e a tela fica sem resposta visual até a requisição terminar. Em conexões lentas, o usuário não sabe se a ação foi registrada.
- **Heurística violada:** #1 Visibilidade do status do sistema
- **Gravidade:** 3
- **Correção proposta:** Desabilitar o botão de salvar durante o `await` e exibir um texto como "Salvando…". Para remoção, substituir o card por um esqueleto ou exibir um spinner. Exemplo:
  ```js
  btn.disabled = true;
  btn.textContent = 'Salvando...';
  await onSaveCallback(...);
  btn.disabled = false;
  ```
- **Evidência:** `modalView.js` linha do `save-book` click — nenhum estado de loading antes do `await onSaveCallback`.

---

## Problema 2
- **Onde:** Tela principal — seção de categorias, botão "Nova Categoria"
- **O que observei:** A criação de categoria usa `prompt()` nativo do navegador — dois prompts em sequência (nome e cor). Além de visualmente fora do padrão da aplicação, `prompt()` bloqueia a thread e não permite validação inline.
- **Heurística violada:** #5 Prevenção de erros / #4 Consistência e padrões
- **Gravidade:** 3
- **Correção proposta:** Substituir os `prompt()` por um modal similar ao de criação de livro, com um `<input type="color">` para a cor (já retorna hex automaticamente) e validação antes de enviar.
- **Evidência:** `categoryView.js` — `btn.addEventListener('click', () => { const name = prompt(...); const color = prompt(...) })`

---

## Problema 3
- **Onde:** Modal de criação de livro e remoção de livro/categoria
- **O que observei:** Não há como desfazer a remoção de um livro ou categoria após confirmar. O `confirm()` nativo é a única barreira. Para o modal de livro, fechar acidentalmente (clicando fora da área) não é suportado — só o botão "Cancelar" fecha.
- **Heurística violada:** #3 Controle e liberdade do usuário
- **Gravidade:** 2
- **Correção proposta:** Adicionar fechamento do modal ao clicar no `.modal-bg` (fundo escuro). Para remoções, substituir o `confirm()` por um modal de confirmação com botão "Desfazer" por alguns segundos (toast com timeout).
- **Evidência:** `modalView.js` — o `.modal-bg` não tem listener de click; `main.js` — `if (confirm('Excluir livro?'))`.

---

## Problema 4 *(específico de SPA — acessibilidade)*
- **Onde:** Seção de livros (`#books-section`) e categorias (`#categories-section`)
- **O que observei:** Quando o JavaScript injeta ou atualiza a lista de livros e categorias no DOM via `innerHTML`, leitores de tela não são notificados da mudança. As regiões dinâmicas não têm `aria-live`, tornando a aplicação inacessível para usuários de tecnologia assistiva.
- **Heurística violada:** #1 Visibilidade do status (para tecnologias assistivas)
- **Gravidade:** 3
- **Correção proposta:** Adicionar `aria-live="polite"` nos elementos que recebem conteúdo dinâmico no `index.html`:
  ```html
  <section id="books-section" aria-live="polite" aria-label="Lista de livros"></section>
  <aside id="categories-section" aria-live="polite" aria-label="Categorias"></aside>
  ```
- **Evidência:** `index.html` — nenhum dos elementos dinâmicos tem `aria-live`; `booksView.js` e `categoryView.js` reescrevem `innerHTML` sem notificar tecnologias assistivas.

---

## Problema 5 *(específico de SPA — acessibilidade)*
- **Onde:** Toda a aplicação
- **O que observei:** O `index.html` não tem `<meta name="viewport">`, tornando a página não responsiva em dispositivos móveis. Além disso, nenhum `<input>` do modal tem `<label>` associado — apenas `placeholder`, que desaparece ao digitar e não é lido por todos os leitores de tela. O `<title>` da página é genérico ("Lectio") e não muda conforme o contexto.
- **Heurística violada:** #6 Reconhecer em vez de lembrar / Acessibilidade
- **Gravidade:** 3
- **Correção proposta:**
  - Adicionar `<meta name="viewport" content="width=device-width, initial-scale=1.0">` no `<head>`.
  - Substituir `placeholder` por `<label for="title">Título</label><input id="title" ...>` em todos os campos do modal.
  - Exemplo no `modalView.js`:
    ```html
    <label for="title">Título *</label>
    <input id="title" placeholder="Ex: Dom Casmurro">
    ```
- **Evidência:** `index.html` — ausência de `<meta viewport>`; `modalView.js` — inputs sem `<label>`.

---

## Problema 6
- **Onde:** Tela principal — após remover um livro ou categoria
- **O que observei:** Ao remover um item, o foco do teclado não é reposicionado. O elemento que tinha foco é destruído do DOM e o foco "cai no vácuo", voltando para o topo da página. Para usuários de teclado, isso obriga a navegar por toda a página novamente.
- **Heurística violada:** #3 Controle e liberdade / Acessibilidade (gestão de foco em SPA)
- **Gravidade:** 2
- **Correção proposta:** Após a remoção e re-render, mover o foco para um elemento coerente, como o título da seção ou o botão FAB:
  ```js
  async function removeBook(id) {
      await bookService.deleteBook(id);
      await init();
      document.getElementById('fab').focus(); // reposiciona o foco
  }
  ```
- **Evidência:** `main.js` — `removeBook()` e `removeCategory()` chamam `init()` sem nenhum `.focus()` posterior.

---

## Problema 7
- **Onde:** Tela principal — estado inicial sem livros
- **O que observei:** Quando não há livros cadastrados, a seção exibe apenas `<p>Nenhum livro cadastrado.</p>` sem nenhuma orientação sobre como adicionar o primeiro livro. O botão FAB (+) existe, mas não é óbvio para um usuário novo que é ele que abre o formulário de cadastro.
- **Heurística violada:** #10 Ajuda e documentação / #6 Reconhecer em vez de lembrar
- **Gravidade:** 1
- **Correção proposta:** No estado vazio, exibir uma mensagem com call-to-action explícito:
  ```html
  <p>Nenhum livro cadastrado. Clique no botão <strong>+</strong> para adicionar seu primeiro livro.</p>
  ```
- **Evidência:** `booksView.js` — `section.innerHTML = '<p>Nenhum livro cadastrado.</p>'`

---

## Resumo
- **Total de problemas encontrados:** 7
- **Problemas de gravidade 3–4 (prioritários):** 4 (Problemas 1, 2, 4 e 5)
- **Score de acessibilidade:** 89 / 100
- **Os 3 que vou corrigir primeiro no E7:**
  1. **Problema 1** — Adicionar loading state nos botões de salvar e remover *(Heurística #1, gravidade 3)*
  2. **Problema 4** — Adicionar `aria-live` nas regiões dinâmicas *(acessibilidade SPA, gravidade 3)*
  3. **Problema 2** — Substituir `prompt()` de categoria por modal com `<input type="color">` *(Heurística #5, gravidade 3)*
