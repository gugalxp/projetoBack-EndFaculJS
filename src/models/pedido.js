const Sequelize = require('sequelize');
 
// Obtem dados de conexão entre sequelize e banco de dados MySQL
const sequelize = require('../database/database.js');
 
// Cria tabela no BD e seus campos
const Pedido = sequelize.define("pedido", {

    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    pedido: {
        allowNull: false,
        type: Sequelize.STRING(100),
        validate: {
            len: [3, 100]
        }
    },
    cliente: {
        allowNull: false,
        type: Sequelize.STRING(1000),
        validate: {
            len: [3, 100]
        }
    },
   valor: {
        allowNull: false,
        type: Sequelize.DOUBLE(),
        validate: {   
            len: [1, 999999]

        }
    }

});
 
module.exports = Pedido;