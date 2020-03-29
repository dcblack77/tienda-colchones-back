const {Schema, model} = require('mongoose');

const requerido = 'Este campo es requerido';

const ProductTypeSchema =  new Schema({
    name: {
        type: String,
        require: [true, requerido]
    }
});

module.exports =  model('ProductType', ProductTypeSchema);
