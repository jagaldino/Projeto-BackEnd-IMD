
  <h1>Blog API com Node.js</h1>

  <p>Este é um projeto em Node.js que funciona como a API de backend para uma aplicação simples de blog. O projeto foi desenvolvido como parte de um trabalho anterior do curso e permite que os usuários criem, gerenciem e visualizem postagens de blog, mantendo a segurança dos dados do usuário por meio da criptografia de senhas.</p>

  <h2>Recursos</h2>
  <ul>
    <li>Criar, ler, atualizar e excluir postagens de blog.</li>
    <li>Autenticação e registro de usuários com criptografia de senhas.</li>
    <li>Autenticação segura de usuários com autorização baseada em tokens.</li>
    <li>Arquitetura de API RESTful para fácil integração com aplicativos front-end.</li>
    <li>Código modular e bem estruturado para facilitar a manutenção.</li>
  </ul>

  <h2>Tecnologias Utilizadas</h2>
  <ul>
    <li>Node.js: O ambiente de tempo de execução para JavaScript do lado do servidor.</li>
    <li>Express.js: Um framework Node.js popular para a construção de aplicativos web.</li>
    <li>MongoDB: Um banco de dados NoSQL para armazenar dados de usuário e postagem de blog.</li>
    <li>Mongoose: Uma biblioteca ODM (Object Data Modeling) para MongoDB.</li>
    <li>Bcrypt: Para a criptografia e o hash de senhas.</li>
    <li>JSON Web Tokens (JWT): Para autenticação e autorização de usuários.</li>
    <li>CORS: Compartilhamento de recursos de origem cruzada para lidar com solicitações de origem cruzada.</li>
    <li>Body-parser: Para analisar dados do corpo da solicitação.</li>
    <li>Helmet: Para adicionar cabeçalhos de segurança HTTP à API.</li>
  </ul>

  <h2>Como Começar</h2>

  <h3>Instalação</h3>
  <ol>
    <li>Clone o repositório em sua máquina local:</li>
    <code>git clone https://github.com/jagaldino/Projeto-BackEnd-IMD.git</code>
    <li>Acesse o diretório do projeto:</li>
    <code>cd Projeto-BackEnd-IMD</code>
    <li>Instale as dependências do projeto:</li>
    <code>npm install</code>
  </ol>

  <h2>Uso</h2>
  <p>Para iniciar o servidor, execute o seguinte comando:</p>
  <pre><code>npm start</code></pre>
  <p>A API estará disponível em <code>http://localhost:8080</code></p>

  <h2>Endpoints</h2>
  <p>Os seguintes endpoints estão disponíveis:</p>
  <ul>
    <li><code>POST /api/usuarios/</code>: Registrar um novo usuário.</li>
    <li><code>PUT /api/usuarios/login</code>: Autenticar um usuário e gerar um token JWT.</li>
    <li><code>GET /api/posts</code>: Recuperar uma lista de postagens de blog.</li>
    <li><code>GET /api/posts/:id</code>: Recuperar uma postagem específica por ID.</li>
    <li><code>POST /api/posts</code>: Criar uma nova postagem de blog (requer autenticação).</li>
    <li><code>PUT /api/posts/:id</code>: Atualizar uma postagem específica de blog (requer autenticação).</li>
    <li><code>DELETE /api/posts/:id</code>: Excluir uma postagem específica de blog (requer autenticação).</li>
  </ul>

  <p>Você pode usar ferramentas como o Postman ou o cURL para interagir com esses endpoints.</p>

  <h2>Contribuição</h2>
  <p>Sinta-se à vontade para contribuir para o projeto, criando problemas, abrindo solicitações de pull ou sugerindo novos recursos e melhorias. Por favor, siga o código de conduta do projeto.</p>

  <h2>Licença</h2>
  <p>Este projeto está licenciado sob a Licença MIT - consulte o arquivo <code>LICENSE</code> para obter mais detalhes.</p>
</body>
</html>
