// Define a utilização do model usuario e a dependência http-status
const Cliente = require('../models/cliente');
const status = require('http-status');
 
// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const nome = req.body.nome;
    const endereço = req.body.endereço;
    const email = req.body.email;
    const telefone = req.body.telefone;
 
    // Popula cada um dos campos do model com os campos recebido na request
    Cliente.create({
        nome: nome,
        endereço: endereço,
        email: email,
        telefone:telefone
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(cliente => {
            if (cliente) {
                res.status(status.OK).send(cliente);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};
 
exports.SelectAll = (req, res, next) => {
    Cliente.findAll()
        .then(cliente => {
            if (cliente) {
                res.status(status.OK).send(cliente);
            }
        })
        .catch(error => next(error));
}
 
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    Cliente.findByPk(id)
        .then(cliente=> {
            if (cliente) {
                res.status(status.OK).send(cliente);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const endereço = req.body.endereço;
    const email = req.body.email;
    const telefone = req.body.telefone;
 
    Cliente.findByPk(id)
        .then(cliente => {
            if (cliente) {
                cliente.update({

                    nome: nome,
                    endereço: endereço,
                    email: email,
                    telefone: telefone
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
 
    Cliente.findByPk(id)
        .then(cliente => {
            if (cliente) {
                cliente.destroy({
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
