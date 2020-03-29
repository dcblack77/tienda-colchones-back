const _ = require('underscore');
const Product = require('../model/product.model');

let createProduct = (req, res) => {

    let body = _.pick(req.body, [
            'name',
            'tipo',
            'precio',
            'destacado'
    ]);

    let newProduct = new Product(body);
    newProduct.save((err, productStorage) => {
        if (err) res.status(500).json({ok: false. err});
        res.status(200).json({
            ok: true,
            productStorage
        })
    });
};

let getProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.status(200).json({
                ok: true,
                products
            });
        })
        .catch(err => res.status(500).json({ok: false, err}));
};

let getProductsDestacados = (req, res) => {
    Product.find({destacado: true})
        .then(products => res.status(200)
            .json({
                ok: true,
                products
            }))
        .catch(err => res.status(500)
            .json({
                ok:false,
                err
            }));

};

module.exports = {
    createProduct,
    getProducts,
    getProductsDestacados
};







