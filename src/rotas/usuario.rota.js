const express = require('express');                                 // O head do código é composto pelas importações dos modulos utilizados.
const router = express.Router();
const { Usuario } = require('../db/models');
const usuMid = require('../middleware/validarUsuario.middleware');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


router.post('/', usuMid);                                          // Validação do middleware na requisição 'Post' e 'Put' antes de direcionar a rota definida.
router.put('/', usuMid);


router.get('/', async (req, res) => {                             // Método 'GET' para listar todos os usuários salvos no banco de dados.
    const usuarios = await Usuario.findAll();
    const resultado = usuarios.map(user => prepararResultado(user.dataValues))
    res.json({usuarios: resultado});
});

router.get("/:id", async (req, res) => {
  const usuario = await Usuario.findByPk(req.params.id);
  if (usuario) {
    res.json({ usuario: prepararResultado(usuario.dataValues) });
  } else {
    res.status(400).json({ msg: "Usuário não encontrado!" });
  }
});

router.post("/", async (req, res) => {
    const senha = req.body.senha;
    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);
    const usuario = { email: req.body.email, senha: senhaCriptografada };
    console.log(`salt: ${salt}`)
    console.log(`senha: ${senhaCriptografada}`)
    const usuarioObj = await Usuario.create(usuario);
    res.json({ msg: "Usuário adicionado com sucesso!", userId: usuarioObj.id });
  });

router.put('/:id', async (req, res) => {                       // Método 'PUT' para atualizar os dados de um usuário passado o id como parâmetro na rota.
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id);
    if (post) {
        usuario.email = req.body.email;
        usuario.email = req.body.email;
        await usuario.save();
        res.json({msg: "Usuário atualizado com sucesso!"});
    } else { 
        res.status(400).json({msg: "Usuário não encontrado!"});
    };
});

router.delete('/:id', async (req, res) => {                      // Método 'DELETE' para deletar um usuário passado o id como parâmetro na rota.
    const id = req.params.id
    const usuario = await Usuario.findByPk(id)
    if (usuario) {
        await usuario.destroy()
        res.json({msg: "Usuário deletado com sucesso!"})
    } else {
        res.status(400).json({msg: "Usuário não encontrado!"})
    };
});

router.post("/login", async (req, res) => {

    const email = req.body.email;
    const senha = req.body.senha;
  
    const usuario = await Usuario.findOne({
      where: {
        email: email,
      },
    });
  
    if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
      const payload = {
        sub: usuario.id,
        iss: "imd-backend",
        aud: "imd-frontend",
        email: usuario.email,
      };
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
      res.json({ accessToken: token })
    } else {
      res.status(403).json({ msg: "usuário ou senha inválidos" })
    }
  });

  function prepararResultado(usuario){
    const result = Object.assign({}, usuario)
    if (result.createdAt) delete result.createdAt
    if (result.updatedAt) delete result.updatedAt
    if (result.senha) delete result.senha
    return result
  }


module.exports = router                                           // Exportação do router para utilização no 'index.js'