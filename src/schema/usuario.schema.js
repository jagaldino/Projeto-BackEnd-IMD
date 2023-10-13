module.exports = {                                                     // Exportação do esquema usuário para utilização no middleware.
    type: "object",
    properties: {                                                     // Definições das propriedades.
        email: {type: "string", format: "email"},                    // Propriedade email com a exigência do formato 'email' que será válidado pelo 'Ajv-formats'.
        senha: {type: "string"}                                     // Propriedade senha.
    },
    required: ["email", "senha"],                                  // Define que as propriedades 'email' e 'senha' são obrigatórias.
    additionalProperties: false                                   // Configuração para não permitir propriedades adicionais.
};