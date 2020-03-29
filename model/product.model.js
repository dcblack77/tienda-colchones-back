const {Schema, model} = require('mongoose');

const requerido = 'Este campo es requerido';

const ProductSchema = new Schema({
    name: {
        type: String,
        require: [true, requerido]
    },
    precio: {
        type: Number,
        require: [true, requerido]
    },
    tipo: {
        type: String,
        enum: ['Colchon', 'Somier'],
        require: [true, requerido]
    },
    destacado: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Product', ProductSchema);
