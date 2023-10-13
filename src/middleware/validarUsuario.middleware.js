const Ajv = require('ajv');                                        // Importação do modulo 'Ajv' para validação de requisições.
const ajv = new Ajv();
const addFormats = require("ajv-formats");                       // Importação do modulo 'Ajv-formats' para validação de requisições com formatos definidos. ex: email
const usuarioSchema = require('../schema/usuario.schema');      // Esquema com modelo de dados válidos da requisição.

addFormats(ajv);   
 
function validarUsuario(req, res, next){                      // Função que valida os dados da requisição de acordo com o esquema definido.
    const usuario = req.body;
    const validate = ajv.compile(usuarioSchema);
    const valid = validate(usuario);
    if (valid){
        next();
    } else {
        res.status(400).json({msg: "Dados inválidos", erros: validate.errors});        // Caso os dados da requisição seja inválidos ele retorna um erro com status 400.
    };
};

module.exports = validarUsuario;                  // Exportação da função como modulo.