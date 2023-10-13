const Ajv = require('ajv');                                      // Importação do modulo 'Ajv' para validação de requisições.
const ajv = new Ajv();
const postSchema = require('../schema/post.schema');            // Esquema com modelo de dados válidos da requisição.

function validarPost(req, res, next){                           // Função que valida os dados da requisição de acordo com o esquema definido.  
    const post = req.body;
    if (post.userId) {
        post.userId = Number(post.userId);
    }
    const validate = ajv.compile(postSchema);
    const valid = validate(post);
    if (valid){
        next();
    } else {
        res.status(400).json({msg: "Dados inválidos", erros: validate.errors});       // Caso os dados da requisição seja inválidos ele retorna um erro com status 400.
    };
};

module.exports = validarPost;                                                        // Exportação da função como modulo.