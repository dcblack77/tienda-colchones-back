const {verifyToken} = require('../middleware/auth.middleware');
const { Router } = require('express');
const api = Router();

// product controller
const {
    createProduct,
    getProducts,
    getProduct,
    getProductsDestacados,
    putProduct,
    deleteProduct,
    getProductByType
} = require('../controller/product.controller');

// PRODUCT ROUTES
api.get('/products', getProductsDestacados);
api.get('/product/:id', getProduct);
api.get('/products/user', verifyToken, getProducts);
api.get('/products/:type', getProductByType);
api.post('/product', verifyToken, createProduct);
api.put('/product/:id', verifyToken, putProduct);
api.delete('/product/:id', verifyToken, deleteProduct);

// USER CONTROLLER
const {
    SignUp,
    LoginUser
} = require('../controller/user.controller');

// USER ROUTES
api.post('/user/signup', SignUp);
api.post('/user/login', LoginUser);

module.exports = api;
