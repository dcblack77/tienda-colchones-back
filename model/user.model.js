const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let rolesValidos = {
    values: ["ADMIN_ROLE", "USER_ROLE", "DEVEP_ROLE"],
    message: "{VALUE} No es un rol Valido"
};
const uniqueValidator = require("mongoose-unique-validator");

let UserSchema = new Schema({
    email: {
        type: String,
        require: [true, "Su correo electronico es requerido"],
        unique: [true, "Email ya existe en nuestra base de datos"]
    },
    password: {
        type: String,
        require: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum: rolesValidos
    },
    reset_token: String,
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date,
        default: null
    }
});

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

UserSchema.plugin(uniqueValidator, {
    message: "{PATH} debe ser unico"
});

module.exports = mongoose.model("Users", UserSchema);
