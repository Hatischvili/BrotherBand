# BrotherBand
![BrotherBand logo](https://i.imgur.com/lODvalf.png)

# Sobre

A BrotherBand é uma API RESTFull de rede social simples desenvolvida em Node.js, a qual permite o usuário adicionar até 5 amigos. Porém, para adicioná-los, você precisa saber a id de usuário da pessoa e compartilhar um segredo.

# Sumário

- [Problema](#problema)
- [Solução](#solução)
- [Implementação](#implementação)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Pacotes utilizados](#pacotes-utilizados)
- [Arquitetura MVC](#arquitetura-mvc)
- [Hosts](#hosts)
- [Rotas](#rotas)
- [Dados da Collection Usuários](#dados-da-collection-usuários)
- [Dados necessários para registro:](#dados-necessários-para-login)
- [Dados necessários para login:](#dados-necessários-para-login)
- [Incrementos futuros](#incrementos-futuros)
- [Autora](#autora)
- [Agradecimentos](#agradecimentos)


# Problema

Com a constante evolução das redes sociais e elas se tornando aos poucos uma parte grande e inevitável de nossas vidas, vários problemas surgiram com elas.

Não é comum abrir sua rede social de escolha e se deparar com comportamento tóxico e preconceituoso, assédio ou se preocupar com números de likes e seguidores. De modo geral, redes sociais estão se tornando e cada vez mais estão se tornando um espaço de insegurança, ódio, medo e ansiedade. Isso é um fator estressante a todos, mas especialmente às pessoas de grupos minoritários e/ou passando por dificuldades relacionadas a saúde mental. 

É fácil de se esquecer que redes sociais originalmente foram criadas para manter conexões com amigos. Mostrar que você possui um laço com alguém e manter essa pessoa próxima. 

Hoje em dia, o principal intuito fora deturpado. Deturpado ao ponto que redes sociais sem dúvidas estão ajudando mais a quebrar laços de amizades e danificar laços familiares mais do que reforçá-los. 

# Solução

A BrotherBand é uma API de rede social propositalmente simples. 

Ao você não possuir feed e só poder adicionar até 5 pessoas próximas, você cria um ambiente saudável e mantém seus laços mais importantes. 

Por ser um ambiente feito para limitar ao máximo facilitadores de atrito, ansiedade e ódio, a API cria um espaço seguro para seus usuários.

Apenas as pessoas que você confia e ama. 

# Implementação

#### Ao se cadastrar, o usuário fornece os seguintes dados: 
- Seu nome
- Uma senha
- Sua data de nascimento
- Um segredo seu 
- Um status, no qual pode ser mudado a qualquer momento
- 5 coisas favoritas na sua vida

#### Após fazer o cadastro, o usuário recebe sua ID cadastrada no banco de dados.

#### Você pode visualizar o perfil de outro usuário apenas com a id do mesmo.

#### Todo e qualquer detalhe pessoal além de nome e data de registro no sistema será ocultado para aqueles que não tenham uma conexão mútua. Também não é possível mandar mensagens para estranhos.

## Para criar uma conexão mútua (a "BrotherBand") e se tornar amigos (ou "Brothers"), é necessário:

1. Mandar uma solicitação. Ela contém o segredo informado pelo usuário ao se cadastrar.
2. A solicitação ser aceita pela pessoa. Ao ser aceita, o segredo do remente é mostrado. Uma mensagem automática contendo o segredo do destinatário é enviada de volta ao rementente. 
3. Caso a pessoa negue o pedido, seu segredo não será exposto.

# Tecnologias utilizadas

- [Visual Studio Code](https://code.visualstudio.com/)
- [JavaScript](https://www.javascript.com/)
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Github](https://github.com/)
- [MongoDB](https://www.mongodb.com/)
- [MongoDB Compass](https://www.mongodb.com/pt-br/products/compass)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [Postman](https://www.postman.com/)
- [Heroku](https://dashboard.heroku.com/login)

# Pacotes utilizados 

- [Express](https://expressjs.com/pt-br/)
- [cors](https://www.npmjs.com/package/cors)
- [Mongoose](https://mongoosejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Moment.js](https://momentjs.com/)
- [nodemon](https://nodemon.io/)


# Arquitetura MVC

```
 📁 brotherband
   |
   |-  📁 src
   |    |
   |    |- 📁 controller
   |         |- 📑 authController.js
   |         |- 📑 brotherController.js
   |         |- 📑 userController.js
   |     
   |
   |    |- 📁 database
   |         |- 📑 mongoConfig.js
   |
   |    |- 📁 helpers
   |         |- 📑 authHelper.js
   |
   |    |- 📁 middlewares
   |         |- 📑 authMiddleware.js
   |
   |    |- 📁 models
   |         |- 📑 UserSchema.js
   |         
   |    |- 📁 routes
   |         |- 📑 allRoutes.js 
   |
   |    |- 📑 app.js
   | 
   |
   |
   |- 📑 .env
   |- 📑 .gitignore
   |- 📑 package-lock.json
   |- 📑 package.json
   |- 📑 server.js
```

# Hosts

- local: http://localhost:3000

- Heroku: https://brotherband.herokuapp.com/

OBS: Por conta da API atualmente só ser backend, utilize um cliente de api como o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download) para interagir.


# Rotas

### Rota raiz de boas vindas

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| GET          | `https://brotherband.herokuapp.com/`    |      Boas vindas                     |  


## Autenticação 

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| POST         | `https://brotherband.herokuapp.com/signup`    |      Cadastro                     |  

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| POST         | `https://brotherband.herokuapp.com/login`    |      Login                   |  


## Referentes ao próprio usuário 

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| GET          | `https://brotherband.herokuapp.com/me`    |      Retorna: nome, nascimento, idade, segredo, status, favoritos e data de registro do próprio usuário fazendo a request                     |  

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| GET          | `https://brotherband.herokuapp.com/me/id`    |      Retorna a ID do usuário fazendo a request               |  

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| GET          | `https://brotherband.herokuapp.com/me/status`    |      Retorna o status do usuário fazendo a request               |  

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| GET          | `https://brotherband.herokuapp.com/me/brothers`    |      Retorna os amigos do usuário fazendo a request               |


| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| PATCH          | `https://brotherband.herokuapp.com/me/status/update`    |      Atualiza o status do usuário fazendo a request             |  


| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| GET          | `https://brotherband.herokuapp.com/me/favorites`    |      Retorna os favoritos do usuário fazendo a request               |  

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| GET          | `https://brotherband.herokuapp.com/me/messages/inbox`    |      Retorna as mensagens recebidas pelo usuário fazendo a request               |  

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| GET          | `https://brotherband.herokuapp.com/me/messages/outbox`    |      Retorna as mensagens enviadas pelo usuário fazendo a request               |  


| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| GET          | `https://brotherband.herokuapp.com/me/brothers/requests/recieved`    |      Retorna os pedidos de amizade recebidos pelo usuário fazendo a request |  | 

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| GET          | `https://brotherband.herokuapp.com/me/brothers/requests/recieved `   |      Retorna os pedidos de amizade enviados pelo usuário fazendo a request               | 

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| GET          | `https://brotherband.herokuapp.com/me/messages/brothers/requests/sent`    |      Retorna os pedidos de amizade recebidos pelo usuário fazendo a request               | 

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| POST        | `https://brotherband.herokuapp.com/me/messages/brothers/requests/accept/:id`    |      Aceita um pedido de amizade enviado de outro usuário            | 

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| DELETE      | `https://brotherband.herokuapp.com/me/messages/brothers/requests/deny`    |      Nega o pedido de amizade de outro usuário. Colocar a id do usuário pedindo no body.       | 

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| DELETE   | `https://brotherband.herokuapp.com/me/brothers/cut/:id`  |      Desfaz a amizade com outro usuário.       | 

## Referentes a outros usuários

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| GET   | `https://brotherband.herokuapp.com/:id`  |      Pega as informações de outro usuário. Caso amigos, retorna: nome, nascimento, idade, segredo, status, favoritos e data de registro. Caso não sejam amigos, retorna apenas nome e data de registro. | 

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| POST  | `https://brotherband.herokuapp.com/add/:id`  |      Manda solicitação de amizade para o usuário especificado      | 

| Método HTTP  | Endpoint                                | Descrição                            |
| ------------ | -------------------------------------| ------------------------------------ |
| POST  | `https://brotherband.herokuapp.com/brother/message/:id`  |      Manda mensagem para um amigo. Colocar mensagem no body.     | 


# Dados da Collection Usuários

- id: gerada automáticamente
- username: string e obrigatório
- password: string e obrigatório
- birthdate: string e obrigatório 
- secret: string e obrigatório
- status: string e obrigatório
- favorites: array de strings e obrigatório
- brothers: array de objectIDs, gerado vazio automaticamente
- inbox: array de strings, gerado vazio automaticamente
- outbox: array de strings, gerado vazio automaticamente
- receivedBBRequests: array de objectIDs, gerado vazio automaticamente
- sentBBRequests: array de objectIDs, gerado vazio automaticamente
- registered in: data, gerado automaticamente 

# Dados necessários para registro:

Prover em formato JSON:

- username: string
- password: string
- birthdate: string (formato YYYY-MM-DD)
- secret: string
- status: string 
- favorites: array de 5 strings


## A API deverá retornar o seguinte JSON:

```
{
    "profile": {
        "_id": "61bc2d04b7868841bce4b863",
        "username": "Arthur C. Eos",
        "password": "$2b$10$5NVnyt.PCHEA.zTIsEdRLOxJ5tfGP/NO1d.8qCZKZUBRDrkfIAWtq",
        "birthdate": "1990-10-01",
        "secret": "I used to be a criminal, but I've changed my ways",
        "status": "Doing some intel gathering job with my partner",
        "favorites": [
            "Candies",
            "My partner",
            "Helping out Dr. Goodall",
            "Patrolling",
            "My work"
        ],
        "brothers": [],
        "inbox": [],
        "outbox": [],
        "receivedBBRequests": [],
        "sentBBRequests": [],
        "registeredIn": "2021-12-17T06:24:03.350Z",
        "__v": 0
    }
}

```

A senha retornada já é a encriptada.

# Dados necessários para login:

Prover em formato JSON:

- username: string
- password: string

## A API deverá retornar o seguinte JSON:

```

{
    "message": "Token utilizado com sucesso.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmMyZDA0Yjc4Njg4NDFiY2U0Yjg2MyIsImlhdCI6MTYzOTcyMjQxMX0.d9NMdl3-LfaJ8iadmOKkl3HPRYbG0m-7IfGcZQ4iyJE"
}


```

# Incrementos futuros

Este projeto ainda está na sua infância, mas entre as melhorias planejadas estão:

### Médio prazo

- Implementação de código frontend baseado em Next.js 
- Melhoria do sistema de mensagens para serem instâneas e em tempo real
- Adição de foto para o perfil
- Adição de álbum de fotos pessoais
- Grupos de pessoas que possuem os exatos mesmos amigos

### Médio-longo prazo

- Refazer o código backend por completo utilizando Rust
- Fazer um aplicativo para celular

### Longo prazo

- Completa transição do código para se tornar um dAPP (aplicação decentralizada bseada em blockchain)
- Adicionar coleções de NFTs 
- Tornar a plataforma um validador de identidade para outros dAPPs

### Em consideração:

- Adição de mais informações pessoais

# Autora

<img style="border-radius: 20%;" src="https://avatars.githubusercontent.com/u/88160445?v=4" width="200px;" alt=""/> </td><br> 

## [Clarice Hatischvili](https://github.com/Hatischvili)
## [LinkedIn](https://www.linkedin.com/in/claricemha/)


# Agradecimentos

Sinceramente, é gente demais pra listar. Não quero ser injusta ou esquecer nomes e também não quero que nenhuma se sinta mal por eu ter esquecido de listar. Então fica de modo geral um agradecimento a TODAS da [Reprograma](https://www.reprograma.com.br/). Sejam professoras, monitoras, facilitadoras, minhas colegas de classe e todas as outras mais por trás do projeto.
Todas são ótimas pessoas e acolhedoras. Sinto que não só saí do curso com conhecimento, mas sim também como uma pessoa melhor e com novas amizades.



























