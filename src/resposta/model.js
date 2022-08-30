const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');
const { Exercicio } = require('../exercicios/model');
const { Usuario } = require('../usuarios/model');

class Resposta extends Model {}
    
Resposta.init({
    id_exercicio: DataTypes.STRING,
    alternativa: DataTypes.STRING
}, { 
    sequelize: sequelizeCon, 
    schema: 'b3',
    modelName: 'resposta'
});

Resposta.belongsTo(Usuario);
Resposta.belongsTo(Exercicio, {
    foreignKey: 'id_exercicio'
});

Usuario.hasMany(Resposta);
Exercicio.hasMany(Resposta, 
    {
        foreignKey: 'id_exercicio'
    });

sequelizeCon.sync();

module.exports = { Resposta };