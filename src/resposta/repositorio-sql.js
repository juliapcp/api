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
}

module.exports = RespostasRepository;