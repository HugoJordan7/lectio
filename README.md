# Lectio - Biblioteca Pessoal

O **Lectio** é uma aplicação fullstack desenvolvida para facilitar a organização de acervos literários pessoais e o acompanhamento do progresso de leitura. O projeto permite que usuários se cadastrem, gerenciem seus livros e monitorem o progresso em cada leitura feita.

## 🚀 Estrutura do Projeto

O projeto utiliza uma arquitetura de monorepo dividida em:

- **/api**: Servidor backend desenvolvido em Node.js.
- **/web**: Interface frontend construída com HTML e Bootstrap.

## 🔗 Links importantes
- Domínio da API: https://lectio-9bc3.onrender.com
- Documentação da API: https://app.swaggerhub.com/apis-docs/hugo-bd2/lectio-api/1.0.0?view=uiDocs

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js / Javascript
- **Frontend:** Bootstrap
- **Banco de Dados:** SQLite
- **Versionamento:** Git & GitHub

## 🏗️ Modelo de Domínio

Para esta fase inicial, foram definidas as seguintes classes principais para o sistema:
- **User (Usuário):** Gerencia os dados de autenticação e perfil (nome, email, senha).
- **Book (Livro):** Representa as obras cadastradas no sistema (id, título, autor, resumo, total de páginas, avaliação, user_email).
- **ReadingProgress (Progresso de Leitura):** Gerencia a interação entre o usuário e o livro (id, user_email, book_id, página_atual, status, start_date, end_date).
- **Category (Categoria)**: Organiza os livros por gênero ou tema (id, nome, cor).

