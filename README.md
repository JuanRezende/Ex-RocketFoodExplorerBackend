<h1 align="center">Food Explorer</h1>

<p align="center">O food explorer é um menu interativo para um restaurante fictício. </p>

---

## Sobre

Após se cadastrar na plataforma e fazer login, os usuários podem fazer pedidos e acompanhar o andamento.

O usuário Admin pode criar, ler, atualizar e deletar um prato e também gerenciar os pedidos dos clientes.

---

## Funções
- [x] Usuário Administrador;
- [x] Login e Registrar;
- [x] Criar, atualizar e deletar pratos;
- [x] Ver detalhes dos pratos criados

---

## Tecnologias utilizadas no Back-end

- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com)
- [Nodemon](https://nodemon.io/)
- [BCryptjs](https://www.npmjs.com/package/bcryptjs)
- [Knex](https://knexjs.org/)
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
- [SQLite](https://www.sqlite.org/index.html)
- [Multer](https://www.npmjs.com/package/multer)
- [CORS](https://www.npmjs.com/package/cors)

---

##  Guia de inicialização

```bash
# Crie uma pasta em seu computador e navegue até a pasta criada no seu terminal

$ cd backend-food-explorer

# Clone o repositório a seguir

$ git clone https://github.com/JuanRezende/Ex-RocketFoodExplorerBackend.git

# Instale as dependências do projeto

$ npm install

#Inicialize as migrations e seeds

$ npm migrate
$ npm seed

#Inicialize a aplicação em ambiente de desenvolvimento

$ npm run dev

# Se tudo correr bem, aparecerá no terminal a mensagem a seguir

Server is running on Port 3333
```

---

## Observações

```bash
# Usuário Admin

$ email: admin@explorer.com
$ password: adminrocket

# Ao tentar fazer o login na plataforma, aguarde por volta de 1 minuto ou mais,
# o backend está hospedado em um serviço gratuito e contém esse periodo de inatividade!
```


