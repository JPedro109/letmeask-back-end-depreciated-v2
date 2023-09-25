# Letmeask - Back-end - Api
[![Coverage Status](https://coveralls.io/repos/github/JPedro109/letmeask-back-end/badge.svg?branch=staging)](https://coveralls.io/github/JPedro109/letmeask-back-end?branch=staging)

<p>🚀 Aplicação voltada para interação de usuários por meio de salas de perguntas e respostas</p>

# Status da Aplicação
<p>🔥 Aplicação Finalizada</p>

# Features
- Cadastro de Usuário
- Atualização de Email
- Atualização de Senha
- Recuperação de Senha
- Exclusão de Usuário
- Criação, Leitura e Exclusão de Salas
- Criação, Leitura e Exclusão de Perguntas
- Criação, Leitura e Exclusão de Respostas

# Tecnologias
- Node
- Typescript
- RabbitMQ
- MySQL
- MongoDB
- Jest

# Padrões Utilizados
- Clean Architecture
- SOLID
- Adapter
- Decorator

# Execução

Para executar a aplicação, instale as dependências com o comando abaixo:
```sh
  yarn install
```

Depois crie um arquivo .env com suas variáveis de ambiente e execute a orquestração de contêineres, com o comando abaixo:

```sh
  docker-compose up -d
```

Por último crie a fila com o nome definido nas variáveis de ambiente na url http://localhost:15672 e depois rode os testes para validar o funcionamento da aplicação com o comando abaixo:

```sh
  docker exec -it api-letmeask yarn test
```

OBS: O envio de email é feito pelo microsserviço que está nesse repositório https://github.com/JPedro109/email-sending-microservice