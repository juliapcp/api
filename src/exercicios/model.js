const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Exercicio extends Model {}
    
Exercicio.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    fonte: DataTypes.STRING,
    img: DataTypes.STRING,
    descricao: DataTypes.STRING,
    disciplina: DataTypes.STRING,
    respostaCorreta: DataTypes.STRING,
    alternativas: DataTypes.JSON,
}, { 
    sequelize: sequelizeCon, 
    schema: 'b3',
    modelName: 'exercicio'
});


module.exports = { Exercicio };