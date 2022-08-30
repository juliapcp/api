const { sequelizeCon } = require('../config/db-config');
const { Exercicio } = require('../exercicios/model');
const { Resposta } = require('./model');

class RespostasRepository {
    constructor() {
    }

    async save(resposta) {
        await Resposta.create(resposta);
    }

    async update(exercicioId, usuarioEmail, alternativa) {
        const resposta = await Resposta.update(
            { alternativa: alternativa },
            { where: { id_exercicio: exercicioId, usuarioEmail: usuarioEmail } }
        )
        return resposta;
    }
    async detailByEmaileExercicio(exercicioId, email) {
        const resposta = await Resposta.findOne({ where: { id_exercicio: exercicioId, usuarioEmail: email } });
        return resposta;
    }
    async countByEmail(email) {
        const resposta = await Resposta.count({ where: { usuarioEmail: email } });
        return resposta;
    }
    async countCorretasByEmail(email) {
        const resposta = await Resposta.count({ where: { usuarioEmail: email },
            include: [
                {
                    model: Exercicio,
                    where: {
                        respostaCorreta: sequelizeCon.literal("UPPER(\"exercicio\".\"respostaCorreta\") = UPPER(\"resposta\".\"alternativa\")") ,
                    },
                    required: true
                }
            ]
        });
        return resposta;
    }
}

module.exports = RespostasRepository;