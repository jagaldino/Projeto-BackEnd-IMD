const express = require('express');                                // O head do código é composto pelas importações dos modulos utilizados.
const router = express.Router();
const postMid = require('../middleware/validarPost.middleware');
const { Post, Usuario } = require('../db/models');
var multer = require('multer');
const path = require('path');
const autenticar = require('../middleware/autenticacao.mid')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
    }
})

const fileFilter = (req, file, cb) => {
    const extensoes = /jpeg|jpg/i
    if (extensoes.test(path.extname(file.originalname))){
            cb(null, true)
    } else {
        return cb('Arquivo não suportado. Apenas jpg e jpeg são suportados.')
    }
}


var upload = multer ({ storage: storage, fileFilter });

router.post('/', upload.single('foto'))
router.post('/', postMid);                                         // Validação do middleware na requisição 'Post' e 'Put' antes de direcionar a rota definida.
router.put('/', postMid);


router.get('/', async (req, res) => {                             // Método 'GET' para listar todos os posts salvos no banco de dados.
    const posts = await Post.findAll();
    res.json({posts: posts});
});

router.get('/:id', async (req, res) => {                                            // Método 'GET' para exibir apenas um post passado o id como parâmetro na rota.
    const post = await Post.findByPk(req.params.id, 
        {include: [{model: Usuario}], raw: true, nest: true});

    const postProcessodo = prepararResultado(post)

    res.json({posts: postProcessodo});
});


router.post('/:id/upload', upload.single('foto'), async (req, res) => {
    console.log(req.file)
    const id = req.params.id
    const post = await Post.findByPk(id)
    if (post){
        post.foto = `/static/uploads/${req.file.filename}`
        await post.save()
        res.json({msg: "Upload realizado com sucesso!"})
    } else {
        res.status(400).json({msg: "Post não encontrado!"})
    }
})

router.post('/', async (req, res) => {
    const data = req.body
    if (req.file){
        data.foto = `/static/uploads/${req.file.filename}`
    }
    const post = await Post.create(data)
    res.json({msg: "Post adicionado com sucesso!"})
})

router.put('/:id', async (req, res) => {                         // Método 'PUT' para atualizar os dados de um post passado o id como parâmetro na rota.
    const id = req.params.id;
    const post = await Post.findByPk(id);
    if (post){
        post.titulo = req.body.titulo;
        post.texto = req.body.texto;
        await post.save();
        res.json({msg: "Post atualizado com sucesso!"});
    } else {
        res.status(400).json({msg: "Post não encontrado!"});
    };
});

router.delete('/:id', async (req, res) => {                     // Método 'DELETE' para deletar um post passado o id como parâmetro na rota.
    const id = req.params.id;
    const post = await Post.findByPk(id);
    if (post){
        await post.destroy();
        res.json({msg: "Post deletado com sucesso!"});
    } else {
        res.status(400).json({msg: "Post não encontrado!"});
    };
});

function prepararResultado(post){
    const result = Object.assign({}, post);

    if (result.createdAt) delete result.createdAt;
    if (result.updatedAt) delete result.updatedAt;
    if (result.userId) delete result.userId;
    if (result.Usuario.senha) delete result.Usuario.senha;
    if (result.Usuario.createdAt) delete result.Usuario.createdAt;
    if (result.Usuario.updatedAt) delete result.Usuario.updatedAt;

    return result;
};

router.post('/', autenticar, upload.single('foto'))
router.post('/', autenticar, postMid)
router.put('/', autenticar, postMid)

module.exports = router;                                      // Exportação do router para utilização no 'index.js'