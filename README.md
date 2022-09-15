O projeto Store Manager cria uma api na qual é possível criar, visualizar, atualizar e deletar produtos e vendas de uma loja. Foi desenvolvido aplicação utilizando o Express.js, criando uma API RESTfull que foi organizada com base na arquitetura Model, Service e Controller. Os testes foram realizados de forma unitária em cada camada utilizando o Mocha, o Chai e o Sinon. A api é ligada a um banco de dados MySql e toda a aplicação é rodada dentro de um container docker.

Para acessar a aplicação, clone este repositório e siga os passos abaixo:
 - git clone git@github.com:FernandaGrein/backend-project-Store-manager.git
 - cd backend-project-Store-manager
 - docker-compose up -d
 - docker exec -it store_manager bash
 - npm install 
 - acesse o Workbench e configure-o conforme as informações do docker-compose.yml
 - npm run migration (para criar o banco de dados)
 - npm run seed  (para popular o banco de dados)
 - npm run start ou npm run debug
 - npm run test:mocha (para rodar os testes)
