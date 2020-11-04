// Define a utilização do model usuario e a dependência http-status
const Produto = require('../models/produto');
const status = require('http-status');
 
// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {

    const nome = req.body.nome;
    const preço_de_custo = req.body.preço_de_custo;
    const preço_de_venda = req.body.preço_de_venda;
    const qtd_estoque = req.body.qtd_estoque ;
 
    // Popula cada um dos campos do model com os campos recebido na request
    Produto.create({
        nome: nome,
        preço_de_custo: preço_de_custo,
        preço_de_venda : preço_de_venda, 
        qtd_estoque : qtd_estoque 
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};
 
exports.SelectAll = (req, res, next) => {
    Produto.findAll()
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            }
        })
        .catch(error => next(error));
}
 
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                res.status(status.OK).send(produto);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;
    const preço_de_custo = req.body.preço_de_custo;
    const preço_de_venda = req.body.preço_de_venda;
    const qtd_estoque = req.body.qtd_estoque;
 
   
    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.update({

                    nome: nome,
                    preço_de_custo: preço_de_custo,
                    preço_de_venda : preço_de_venda, 
                    qtd_estoque : qtd_estoque 
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
 
    Produto.findByPk(id)
        .then(produto => {
            if (produto) {
                produto.destroy({
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
