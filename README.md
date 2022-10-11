<h1 align="center">Trybe Futebol Clube</h1>
<p align="center">Neste projeto, foi desenvolvido um site informativo sobre partidas e classificações de futebol.</p>

---

<br>

<h2 align="center">📃 Sobre o Projeto</h2>

<p align="left">
  A aplicação foi feita de forma "dockerizada", tendo um container para o front-end, um para o back-end e um para o banco de dados (MySql).
  <br>
  O back-end utiliza modelagem de dados através do Sequelize com typeScript e POO além de atender aos princípios do SOLID, padrões REST e arquitetura MSC.
  <br>
  O front-end já havia sido implementado, sendo assim, tive que respeitar algumas regras de negócio para que minha API pudesse ser consumida corretamente.
  <br>
  Para fazer modificações nas tabelas é necessário fazer login, o que lhe atribuirá um token de validação.
  As senhas são armazenadas no banco de dados de maneira criptografada através do <b>bcrypt.js</b> e os tokens são gerados pelo <b>jwt</b> (json web token).
  <br>
  Também foram feitos testes de integração para mais de 80% da aplicação.
</p>

<br>

<h2 align="center">Rotas utilizáveis</h2>

<details>
  <summary><strong>Ver rotas</strong></summary><br />
  
  
- POST `/login` para fazer login e receber um token. Utilize um body nesse formato:

```jsx
  {
  "email": "admin@admin.com",
  "password": "secret_admin"
  }
```
  
---
  
- POST `/matches` para criar uma nova partida. Utilize um body nesse formato:

```jsx
{
  "homeTeam": 16, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeam": 8,  // O valor deve ser o id do time
  "awayTeamGoals": 2,
  "inProgress": true,
}
```

---

- GET `/login/validate` deverá ter um `header` com parâmetro `authorization`, onde ficará armazenado o `token` gerado no login, retorna a role do usuário .

---

- GET `/teams` retorna todos os times.

---

- GET `/teams/:id` retornar dados de um time específico.

---
  
- GET `/matches` retorna dados de todas as partidas.

---

- GET `/matches/search?inProgress=true` retorna dados das partidas em andamento.

---
  
- GET `/matches/search?inProgress=false` retorna dados das partidas finalizadas.

---
  
- GET `/leaderboard` retorna a classificação geral dos times.

---
  
- GET `/leaderboard/home` retorna a classificações dos times da casa.

---
  
- GET `/leaderboard/away` retorna a classificações dos times fora de casa.

---

- PATCH `/matches/:id/finish` para atualizar a partida com o <b>id</b> correspondente para finalizada.

---
  
- PATCH `/matches/:id` para atualizar o saldo de gols da partida com o <b>id</b> correspondente. Utilize um body nesse formato:
  
```jsx
{
  "homeTeamGoals": 2,
  "awayTeamGoals": 1
}
```

</details>

<br>

---

### 🛠 Tecnologias e Bibliotecas utilizadas no desenvolvimento do projeto

- **[Node.js](https://nodejs.org/en/)**

- **[MySQL](https://www.mysql.com/products/workbench/)**

- **[Mysql2](https://www.npmjs.com/package/mysql2)**

- **[Express](http://expressjs.com/pt-br/)**

- **[Nodemon](https://www.npmjs.com/package/nodemon)**
  
- **[Sequelize](https://sequelize.org/)**
  
- **[JWT](https://jwt.io/introduction)**
  
- **[Joi](https://www.npmjs.com/package/joi)**

- **[TypeScript](https://www.typescriptlang.org/pt/)**

- **[Mocha](https://mochajs.org/)**

- **[Chai](https://www.chaijs.com/)**

- **[bcrypt](https://www.npmjs.com/package/bcrypt)**

---

### 🚀 Como executar o projeto

_Pré-requisitos_

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/get-docker/).


É recomendado utilizar algum cliente HTTP, como [Postman](https://www.postman.com/) ou o [Insomnia](https://insomnia.rest/download).

Também é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

---

_Clone o repositorio_

```jsx
git clone git@github.com:TonyyCruz/trybe-futebol-clube.git
```

---


<details>
  <summary><strong>:whale: Rodando no Docker</strong></summary><br />
 
_Rode na raiz do projeto_

```jsx
  npm run install:apps && compose:up
```

- Esse serviço irá inicializar três containers chamados `app_frontend`, `app_backend` e outro chamado `mysql`.

 ⚠️Atenção: Não esqueça de renomear o arquivo .env.example em /app/backend para `.env`
  
  </details>
  
---

### 💡 Scripts prontos
<details>
  <summary><strong>Scripts</strong></summary><br />
  
  - Iniciar a aplicação padrão:
  ```sh
    npm compose:up
  ```

  - Finalizar a aplicação padrão:
  ```sh
    npm compose:down
  ```
  
  - Iniciar a aplicação com nodemon:
  ```sh
    npm run compose:up:dev
  ```
  
  - Finalizar a aplicação com nodemon:
  ```sh
    npm run compose:up:dev
  ```
  
  - Resetar o banco de dados, precisa estar em app/backend:
  ```sh
    npm run db:reset
  ```
  
  - Testes de integração, precisa estar em app/backend:
  ```sh
    npm test
  ```

  <br />
</details>

---
