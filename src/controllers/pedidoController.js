// Define a utilização do model usuario e a dependência http-status
const Pedido = require('../models/pedido');
const status = require('http-status');
 
// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {

    const pedido = req.body.pedido;
    const cliente = req.body.cliente;
    const valor = req.body.valor;
    const quantidade = req.body.quantidade ;
 
    // Popula cada um dos campos do model com os campos recebido na request
    Pedido.create({
        pedido: pedido,
        cliente : cliente ,
        valor : valor, 
        quantidade : quantidade 
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(pedido => {
            if (pedido) {
                res.status(status.OK).send(pedido);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};
 
exports.SelectAll = (req, res, next) => {
    Pedido.findAll()
        .then(pedido => {
            if (pedido) {
                res.status(status.OK).send(pedido);
            }
        })
        .catch(error => next(error));
}
 
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    Pedido.findByPk(id)
        .then(pedido => {
            if (pedido) {
                res.status(status.OK).send(pedido);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Update = (req, res, next) => {
    const id = req.params.id;
    const pedido = req.body.pedido;
    const cliente = req.body.cliente;
    const valor = req.body.valor;
    const quantidade = req.body.quantidade;


   
    Pedido.findByPk(id)
        .then(pedido => {
            if (pedido) {
                pedido.update({

                    pedido: pedido,
                    cliente : cliente ,
                    valor : valor, 
                    quantidade : quantidade  
                },

                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Delete = (req, res, next) => {
    const id = req.params.id;
 
    Pedido.findByPk(id)
        .then(pedido => {
            if (pedido) {
                pedido.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
