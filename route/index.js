const {Router} = require('express');
const api = Router();

// product controller
const {
    createProduct,
    getProducts,
    getProductsDestacados
} = require('../controller/product.controller');

// PRODUCT ROUTER
api.get('/products', getProductsDestacados);
api.get('/products/user', getProducts);
api.post('/product', createProduct);


module.exports = api;
