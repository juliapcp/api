// const ExerciciosRepository = require('./repositorio-memory');
const ExerciciosRepository = require('./repositorio-sql');
const RespostasRepository = require('../resposta/repositorio-sql');
const crypto = require('crypto');
const { readSync } = require('fs');

class ExerciciosController {

    constructor() {
        this.repository = new ExerciciosRepository();
        this.repositoryRespostas = new RespostasRepository();
    }

    async create(req, res) {
        console.log("CRIANDO UMA NOVA QUESTAO");
        const ex = {  
            id: crypto.randomUUID(),
            ...req.body,
            disciplina: req.body.disciplina.toUpperCase()
        };

        await this.repository.save(ex);
        
        return res.json({
            ex
        });
    }

    async random(req, res) {
        const disciplina = await this.repository.random();
        return res.json(disciplina);
    }

    async list(req, res) {
        const disciplina = req.query.disciplina.toUpperCase();
        const listagem = await this.repository.list(disciplina);
        console.log(listagem)
        return res.json(listagem);
    }

    async detail(req, res) {
        const { id } = req.params;
        const exercicio = await this.repository.detail(id);
        return res.json(exercicio);
    }

    async answer(req, res) {
        const { id } = req.params;
        const usuarioEmail = req.user.email;
        const alternativa = req.body.alternativa;
        const exercicio = await this.repository.detail(id);
        if(!exercicio){
            res.status(404);
            return res.json({message: "Exercício não encontrado"});
        }
        const respostaAnterior = await this.repositoryRespostas.detailByEmaileExercicio(id, usuarioEmail);
        if(respostaAnterior){
            await this.repositoryRespostas.update(id, usuarioEmail, alternativa );
            res.status(200);
            return res.json({ message: "Resposta alterada" });
        } else if(req.body.alternativa) {
            const resposta = { id_exercicio: id, alternativa: alternativa, usuarioEmail}
            await this.repositoryRespostas.save(resposta);
            res.status(201);
            return res.json({ message: "Resposta registrada" });
        } else {
            res.status(401);
            return res.json({message: "Alternativa é um campo obrigatório"});
        }
    }
}


module.exports = ExerciciosController;