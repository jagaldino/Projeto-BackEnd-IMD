module.exports = {                                                           // Exportação do esquema post para utilização no middleware.     
    type: "object",
    properties: {                                                           // Definições das propriedades.
        titulo: {type: "string", maxLength: 100, minLength: 5},            // Propriedade título com limite minímo e máximo de caracteres.
        texto: {type: "string"},
        userId: {type: "integer"}                                          // Propriedade texto.
    },
    required: ["titulo", "texto"],                             // Define que as propriedades 'título' e 'texto' são obrigatórias.                       
    additionalProperties: false                                         // Configuração para não permitir propriedades adicionais.
};