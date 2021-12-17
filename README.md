# BrotherBand
![BrotherBand logo](https://i.imgur.com/lODvalf.png)

# Sobre

A BrotherBand é uma API RESTFull de rede social simples desenvolvida em Node.js, a qual permite o usuário adicionar até 5 amigos. Porém, para adicioná-los, você precisa saber a id de usuário da pessoa e compartilhar um segredo.

## O problema

Com a constante evolução das redes sociais e elas se tornando aos poucos uma parte grande e inevitável de nossas vidas, vários problemas surgiram com elas.

Não é comum abrir sua rede social de escolha e se deparar com comportamento tóxico e preconceituoso, assédio ou se preocupar com números de likes e seguidores. De modo geral, redes sociais estão se tornando e cada vez mais estão se tornando um espaço de insegurança, ódio, medo e ansiedade. Isso é um fator estressante a todos, mas especialmente às pessoas de grupos minoritários e/ou passando por dificuldades relacionadas a saúde mental. 

É fácil de se esquecer que redes sociais originalmente foram criadas para manter conexões com amigos. Mostrar que você possui um laço com alguém e manter essa pessoa próxima. 

Hoje em dia, o principal intuito fora deturpado. Deturpado ao ponto que redes sociais sem dúvidas estão ajudando mais a quebrar laços de amizades e danificar laços familiares mais do que reforçá-los. 

## Solução

A BrotherBand é uma API de rede social propositalmente simples. 

Ao você não possuir feed e só poder adicionar pessoas próximas, você cria um ambiente saudável e mantém seus laços mais importantes. 

Por ser um ambiente feito para limitar ao máximo facilitadores de atrito, ansiedade e ódio, a API cria um espaço seguro para seus usuários.

Apenas as pessoas que você confia e ama. 

## Implementação

- Ao se cadastrar, o usuário fornece os seguintes dados:
Seu nome
Uma senha
Sua data de nascimento
Um segredo seu 
Um status, no qual pode ser mudado a qualquer momento
5 coisas favoritas na sua vida

- Após fazer o cadastro, o usuário recebe sua ID cadastrada no banco de dados.

- Você pode visualizar o perfil de outro usuário apenas com a id do mesmo.

- Todo e qualquer detalhe pessoal além de nome e data de registro no sistema será ocultado para aqueles que não tenham uma conexão mútua. Também não é possível mandar mensagens para estranhos.

### Para criar uma conexão mútua (a "BrotherBand") e se tornar amigos (ou "Brothers"), é necessário:

1. Mandar uma solicitação. Ela contém o segredo informado pelo usuário ao se cadastrar.
2. A solicitação ser aceita pela pessoa. Ao ser aceita, o segredo do remente é mostrado. Uma mensagem automática contendo o segredo do destinatário é enviada de volta ao rementente. 
3. Caso a pessoa negue o pedido, seu segredo não será exposto.

## Tecnologias utilizadas

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

## Pacotes utilizados 

- [Express](https://expressjs.com/pt-br/)
- [cors](https://www.npmjs.com/package/cors)
- [Mongoose](https://mongoosejs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Moment.js](https://momentjs.com/)
- [nodemon](https://nodemon.io/)
- [apiDoc](https://apidocjs.com/)



## Arquitetura MVC

 📁 cestas-solidarias
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
   |    |- 📑 apidoc.json
   |
   |
   |- 📑 .env
   |- 📑 .gitignore
   |- 📑 package-lock.json
   |- 📑 package.json
   |- 📑 server.js


## Rotas

- local: http://localhost:3000

- Heroku: https://brotherband.herokuapp.com/

Por conta da API atualmente só ser backend, utilize um cliente de api como o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/download) para interagir.








