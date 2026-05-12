# Lectio - Biblioteca Pessoal

O **Lectio** é uma aplicação fullstack desenvolvida para facilitar a organização de acervos literários pessoais e o acompanhamento do progresso de leitura. O projeto permite que usuários se cadastrem, gerenciem seus livros e monitorem o progresso em cada leitura feita.

## 🚀 Estrutura do Projeto

O projeto utiliza uma arquitetura de monorepo dividida em:

- **/api**: Servidor backend desenvolvido em Node.js.
- **/web**: Interface frontend construída com HTML e Bootstrap.

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js
- **Frontend:** Bootstrap
- **Banco de Dados:** PostgreSQL
- **Versionamento:** Git & GitHub

## 🏗️ Modelo de Domínio

Para esta fase inicial, foram definidas as seguintes classes principais para o sistema:

### 1. Classes de Domínio
- **User (Usuário):** Gerencia os dados de autenticação e perfil (id, nome, email, senha).
- **Book (Livro):** Representa as obras cadastradas no sistema (id, título, autor, resumo, total de páginas, avaliação, user_id).
- **ReadingProgress (Progresso de Leitura):** Gerencia a interação entre o usuário e o livro (id, user_id, book_id, página_atual, status, start_date, end_date).
- **Category (Categoria)**: Organiza os livros por gênero ou tema (id, nome).
- **Tag (Etiqueta)**: Marcadores personalizados como "Favorito", "Lerei em 2026", "Prioridade" (id, nome, cor).

### 2. Relacionamentos
- **Associação:** Uma Category (ex: "Ficção") pode ter vários livros, e um livro pode ter várias categorias. Um livro pode existir sem categoria e uma categoria pode existir sem um livro.
- **Agregação:** Um livro pode ter várias TAGS, mas as TAGS podem existir fora do contexto do livro.
- **Composição:** Um *Progresso de Leitura* é dependente da existência de um *Usuário* e um *Livro*; sem eles, o registro de progresso não possui razão de existir.
