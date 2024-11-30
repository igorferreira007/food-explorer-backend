# Food Explorer - Backend

Este repositório contém o código do backend da aplicação Food Explorer, o desafio final do curso Explorer da Rocketseat. Este backend fornece as funcionalidades e a API necessárias para gerenciar pratos de um restaurante e autenticação de usuários.

## Sobre o Backend

O backend do Food Explorer foi desenvolvido utilizando Node.js com o framework Express. Ele implementa uma API RESTful para gerenciar pratos, ingredientes e usuários, além de permitir autenticação com tokens JWT.

O banco de dados utilizado é o SQLite, gerenciado com o auxílio do Knex.js.

## Tecnologias

As principais tecnologias utilizadas no backend incluem:

- **Node.js:** Plataforma JavaScript para desenvolvimento backend.
- **Express:** Framework para criação de APIs.
- **SQLite:** Banco de dados leve e simples.
- **Knex.js:** Query builder para SQL.
- **BCrypt.js:** Para hash de senhas.
- **JWT (JSON Web Token):** Para autenticação.
- **Multer:** Para upload de arquivos.
- **Dotenv:** Para gerenciar variáveis de ambiente.
- **Cors:** Para controle de acesso entre diferentes origens.

## Funcionalidades Principais

- **Autenticação:** Login e registro de usuários com senha criptografada.
- **Gerenciamento de Pratos:** Administradores podem adicionar, editar e excluir pratos.
- **Consulta de Pratos:** Usuários podem visualizar e pesquisar pratos disponíveis.
- **Upload de Imagens:** Upload e armazenamento de imagens para os pratos.

## Como Configurar e Executar o Backend Localmente

### Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado na sua máquina:

- Node.js (versão 16 ou superior)
- NPM ou Yarn

### Passo a Passo

1. Clone o repositório:

    ```
    git clone https://github.com/igorferreira007/food-explorer-backend.git

2. Navegue para o diretório do projeto:

    ```
    cd food-explorer-backend

3. Instale as dependências:

    ```
    npm install

4. Configure as variáveis de ambiente:  
Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

    ```
    AUTH_SECRET=seu_secret_aqui
    PORT=3333

5. Execute as migrações para criar as tabelas do banco de dados:

    ```
    npm run migrate

6. Inicie o servidor:

    ```
    npm run dev

O servidor estará disponível em http://localhost:3333.

## Rotas Principais da API

### Autenticação

- POST /users: Registro de usuários.
- POST /sessions: Login e geração de token.

### Pratos

- GET /dishes: Listagem de pratos.
- POST /dishes: Criação de pratos (somente administradores).
- PUT /dishes/:id: Edição de pratos (somente administradores).
- DELETE /dishes/:id: Exclusão de pratos (somente administradores).

### Upload de Imagens

- PATCH /dishes/:id/image: Upload de imagem para um prato.

## Observações

Para testar a aplicação em conjunto com o frontend, clone também o repositório do [frontend](https://github.com/igorferreira007/food-explorer-frontend.git) e siga as instruções no README.md correspondente.