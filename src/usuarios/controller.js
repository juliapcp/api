const { Usuario } = require('./model');
const RespostasRepository = require('../resposta/repositorio-sql');
const { Resposta } = require('../resposta/model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class UsuariosController {

    constructor() {
        this.repositoryRespostas = new RespostasRepository();
    }

    async create(req, res) {
        // INPUT
        const { email, senha, nome } = req.body;

        // PROCESSAMENTO
        const user = await Usuario.create({
            email, senha, nome
        });

        // RESPOSTA
        return res.status(201).json(user);

    }

    async auth(req, res) {
        const { email, senha } = req.body;

        const user = await Usuario.findOne({
            where: {
                email, senha
            }
        });

        if (!user) {
            return res.status(400).json({ msg: "USER AND PASS NOT MATCH"});
        }
        console.log(user);
        const meuJwt = jwt.sign(user.dataValues, 'SECRET NAO PODERIA ESTAR HARDCODED')
        return res.json(meuJwt);
    }

    async list(req, res) {
        const users = await Usuario.findAndCountAll();
        res.json(users);
    }

    async profile(req, res) {
        const {user} = req;
        user.respostasDadas = await this.repositoryRespostas.countByEmail(user.email);
        user.respostasCorretas = await this.repositoryRespostas.countCorretasByEmail(user.email);
        user.taxaAcerto = (user.respostasCorretas / user.respostasDadas) * 100;
        res.json(user);
    }
}


module.exports = UsuariosController;