apiSoon

O projeto apiSoon, aplicação para criar solicitações e registro de demanda para realização de algum serviço que neste contexto é movimentar algum veículo através de um guincho ou de um caminhão cegonha.

Para que a aplicação possa ser executada e testada em ambiente local de desenvolvimento, alguns itens de software devem estar previamente instalados.

- Node.js [(Guia de Instalação)](https://nodejs.org/en/download/package-manager/)
- Npm [(Guia de Instalação)](https://balta.io/blog/node-npm-instalacao-configuracao-e-primeiros-passos).
- Docker [(Guia de Instalação)](https://docs.docker.com/engine/install/)
- Docker Compose [(Guia de Instalação)](https://docs.docker.com/compose/install/)
- Postman [(Guia de Instalação)](https://www.postman.com/downloads/).

## Requisitos opcionais

- **Editor SQL**: DBeaver Community [(Download)](https://dbeaver.io/download/)

<br>

## Como executar a aplicação

### Configuração inicial do ambiente

1. Crie uma pasta em um local onde você tenha direitos de gravação e leitura;
2. Descompacte o arquivo zip e copie os arquivos da aplicação para a pasta criada
3. Alterar dados de acesso ao banco de dados, caso seja necessário, editando os arquivos "docker-compose.yml" e src/database/config/config.ts.
4. Todos os passos a seguir devem ser executados em linha de comando, a partir do local onde o projeto foi copiado
5. Instalar os pacotes necessários para a execução da aplicação, digitando os comandos:

```
  npm install
```
  
<br>
    
### Início rápido com Docker

Aqui um passo a passo para iniciar a aplicação de forma rápida. Caso ocorra algum problema, ou deseje conhecer os detalhes de cada passo, siga para a próxima seção.

Abra uma nova seção de linha de comando. Mude para a pasta onde se encontra a aplicação. Nesta janela será executado o container, digitando os comandos:

```
  docker-compose up -d
```

Abra uma nova seção de linha de comando, na mesma pasta do passo anterior, onde será executada a aplicação:

```  
  npm run db:reset
  npm run db:populate
```

<br>

### Executar e testar a aplicação


- Executar a aplicação:

```
  npm start  
```

- Testar o acesso a API através de [http://localhost:3001/](http://localhost:3001/)


### Executar e testar a aplicação via Postman

1. Para usar o Postman para testar a API do projeto apiSoon, siga os seguintes passos:
2. Abra o Postman em seu computador
3. Clique no botão "New" no canto superior esquerdo da tela
4. Selecione a opção "Request"
5. Insira o endereço URL da API do projeto apiSoon, que é http://localhost:3001/, na barra de endereço do Postman
6. Selecione o tipo de requisição desejado, como GET, POST, de acordo com a operação que deseja realizar na API
7. (Opcional) Adicione parâmetros à requisição, se necessário, na aba "Params"
8. Clique no botão "Send" para enviar a requisição
9. Verifique a resposta da requisição na aba "Response"


### Executar e testar a aplicação com Debuger
Esta aplicação já está configurada para executar com debugger.

1. Clique em executar e depurar na aba lateral do VSCode.
2. Na guia superior selecione "testes" ou "dev" e clique em "Iniciar Depuração".
3. Adicione seus breakpoints.

<br>
