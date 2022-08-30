const { DataTypes, Model } = require('sequelize');

const { sequelizeCon } = require('../config/db-config');

class Usuario extends Model {}
    
Usuario.init({
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nome: DataTypes.STRING,
    senha: DataTypes.STRING
}, { 
    sequelize: sequelizeCon, 
    schema: 'b3',
    modelName: 'usuario'
});


module.exports = { Usuario };