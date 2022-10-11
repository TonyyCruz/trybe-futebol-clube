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
  As senhas são armazenadas no banco de dados de maneira criptografada através do bcrypt.js e os tokens são gerados pelo jwt (json web token).
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


---

### 🚀 Como executar o projeto

_Pré-requisitos_

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
  - [Mysql](https://www.mysql.com/) para rodar local ou [Docker](https://docs.docker.com/get-docker/) para rodar em container.


É recomendado utilizar algum cliente HTTP, como [Postman](https://www.postman.com/) ou o [Insomnia](https://insomnia.rest/download).

Também é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

---

_1- Clonar o repositorio_

```jsx
git clone git@github.com:TonyyCruz/blogs_api.git
```

---


<details>
  <summary><strong>:whale: Rodando no Docker</strong></summary><br />
  
  ## Com Docker
 
 
_Rode o serviço `node` com o comando_

```jsx
  docker-compose up -d
```

- Esse serviço irá inicializar dois containers chamados `blogs_api` e outro chamado `blogs_api_db`.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

_Via CLI use o comando_
```jsx
docker exec -it blogs_api bash
```
- Ele te dará acesso ao terminal interativo do container blogs_api(node) criado pelo compose, que está rodando em segundo plano.

_Instale as dependências `dentro do container` com_

```jsx
npm install
```

⚠️Atenção: Caso opte por utilizar o Docker, TODOS os scripts disponíveis no package.json devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec.
  
  </details>
  
---
  
<details>
  <summary><strong>:computer: Rodando Localmente</strong></summary><br />
 
 _Instale as dependências com o comando_
 
 ```jsx
npm install
```
- Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `node` instalado em seu computador.
  - Recomenda-se a versão `^16`
  
 ⚠️Atenção: Não esqueça de renomear/configurar o arquivo .env.example
</details>

---


### 💡 Scripts prontos
<details>
  <summary><strong>Scripts</strong></summary><br />

  - Criar o banco de dados e gerar as tabelas:
  ```sh
    npm run prestart
  ```

  - Limpar e popular o banco de dados:
  ```sh
    npm run seed
  ```

  - Iniciar o servidor Node:
  ```sh
    npm start
  ```

  - Iniciar o servidor Node com nodemon:
  ```sh
    npm run debug
  ```

  <br />
</details>

---
