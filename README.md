<p align="center">
   <img src="./.github/proffy-logo.png" alt="Proffy" width="280"/>
</p>

<p align="center">	
  <a href="https://www.linkedin.com/in/ricardo-pereira-de-souza-filho-941541b9/">
      <img alt="Ricardo Filho" src="https://img.shields.io/badge/-rpsfilho93-8257E5?style=flat&logo=Linkedin&logoColor=white" />
   </a>
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/rpsfilho93/proffy?color=774DD6">
  
  <img alt="License" src="https://img.shields.io/badge/license-MIT-8257E5">
  
  <a href="https://github.com/rpsfilho93/proffy/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rpsfilho93/proffy?color=8257E5&logo=github">
  </a>
</p>

>  Projeto feito durante a Next Level Week #2 da @Rocketseat (08/2020) :rocket:

# :bulb: Conceito
<p>
Proffy é uma plataforma que conecta professores e alunos. Os professores divulgam seus dados (biografia, horários disponíveis...), e os alunos escolhem seus professores preferidos e podem entrar em contato com eles via Whatsapp.
</p>

# :computer: Demo site
Veja o site de demonstração clicando no link abaixo:
https://rpsfilho-proffy.netlify.app

### :computer: Funcionalidades

- [x] Autenticação de usuários

- [x] Recuperação de senhas

- [x] Perfil do proffy

- [x] Splash Screen no React Native

- [x] Paginação na listagem de proffys

- [x] Listar proffys favoritos

- [x] Logout da aplicação

- [x] Deploy da aplicação

# :computer: Website
<div style="display: flex; flex-direction: 'row'; justify-content: 'space-between';">
   <img src="./.github/strech.gif" height="200">
   <img src="./.github/weblogin.gif" height="200">
</div>


# :iphone: Mobile App
<div style="display: flex; flex-direction: 'row';">
   <img src="./.github/login.gif" height="300">
   <img src="./.github/list.gif" height="300">
   <img src="./.github/teach.gif" height="300">
</div>

# :construction_worker: Como rodar na sua máquina

### Clone o repositório
```bash
# Clone o Repositório
$ git clone https://github.com/rpsfilho93/proffy.git
```

### API
   A API utiliza uma database Postgres. Você pode utilizar um container [docker](https://docs.docker.com/get-docker/) para hospedar a database Postgres localmente como nesse [tutorial](https://docs.docker.com/engine/examples/postgresql_service/). E em seguida preencher as configurações de autenticação em uma arquivo .env seguindo o modelo do arquivo [.env.example](https://github.com/rpsfilho93/proffy/blob/main/server/.env.example).
   
```bash
# Acessar pasta do servidor
$ cd Proffy/server

# Instalar dependências
$ yarn 

#Inicie o banco de dados usando container do docker
docker run --name postgres_db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

#Configure o arquivo .env seguindo o modelo .env.example com os dados da sua database. Em seguida, execute as mogrations.  

yarn migrate

# Iniciar API
$ yarn dev
```

### Website

```bash
# Acessar a pasta web
$ cd Proffy/web

# Instalar as depedências
$ yarn install

# Iniciar aplicação
$ yarn start
```     
### Mobile App
Você pode rodar o Proffy em um celular com o aplicativo [expo](https://play.google.com/store/apps/details?id=host.exp.exponent) instalado ou um emulador android/ios.

```bash
# Acessar a pasta mobile
$ cd Proffy/mobile

# Instalar depedências
$ yarn

# Iniciar aplicação
$ yarn start
```
Depois leia o QRCode com o app do [expo](https://play.google.com/store/apps/details?id=host.exp.exponent) ou rode em um emulador.

# :tada: Obrigado!

### Autor

👤 **Ricardo Filho**

- Twitter: [@ricardo_fio](https://twitter.com/ricardo_fio)
- Github: [@rpsfilho93](https://github.com/rpsfilho93)
- LinkedIn: [@ricardo-pereira-de-souza-filho-941541b9](https://www.linkedin.com/in/ricardo-pereira-de-souza-filho-941541b9)

## Licença

The [MIT License]() (MIT)

Copyright :copyright: 2020 - Proffy

