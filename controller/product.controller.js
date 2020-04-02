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
    const limit = limitParams(req.query.from, req.query.limit);

    Product.find()
        .skip(limit.from)
        .limit(limit.limit)
        .then(products => {
            res.status(200).json({
                ok: true,
                products
            });
        })
        .catch(err => res.status(500).json({ok: false, err}));
};

let getProduct = (req, res) => {
    let id =  req.params.id
    Product.findById(id)
        .then(product => {
            res.status(200).json({
                ok: true,
                product
            });
        })
        .catch(err => res.status(500).json({ok: false, err}));
};

let getProductByType = (req, res) => {
    let type = req.params.type;
    Product.find({tipo: type})
        .then(products => {
            res.status(200).json({
                ok: true,
                products
            });
        })
        .catch(err => res.status(500).json({ok: false, err}));
};

let getProductsDestacados = (req, res) => {
    const limit = limitParams(req.query.from, req.query.limit);
    Product.find({destacado: true})
        .skip(limit.from)
        .limit(limit.limit)
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

let putProduct = (req, res) => {
    let body = _.pick(req.body, [
        'name',
        'tipo',
        'precio',
        'destacado'
    ]);
    let _id = req.params.id;

    Product.findByIdAndUpdate(_id, body, (err, response) => {
        if (err) res.status(500)
            .json({
                ok: false,
                err
            });
        res.status(200)
            .json({
                ok: true,
                response
            })
    })
};

let deleteProduct = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id)
        .then(product => res.status(200).json({
            ok:true,
            product
        }))
        .catch(err => res.status(500).json({
            ok:false,
            err
        }));
};

let limitParams = (from = 0 , limit = 10) => {
    limit = Number(limit);
    from = Number(from);

    return {
        limit,
        from
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    getProductByType,
    getProductsDestacados,
    putProduct,
    deleteProduct
};







