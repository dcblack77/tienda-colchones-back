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
        type: Schema.Types.ObjectId,
        ref: 'ProductType'
    },
    destacado: Boolean
});

module.exports = model('Product', ProductSchema);
