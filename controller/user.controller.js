const bcrypt = require("bcrypt");
const _ = require("underscore");
const jwt = require("jsonwebtoken");
require("../config");

const User = require("../model/user.model");

let LoginUser = (req, res) => {
    let body = req.body;

    User.findOne({ email: body.user }, (err, userdb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userdb) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "User no found"
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userdb.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Password no found"
                }
            });
        }

        let token = jwt.sign({
                user: userdb
            },
            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }
        );

        res.json({
            ok: true,
            user: userdb,
            token
        });
    });
};

let SignUp = (req, res) => {
    //let body = req.body;
    let body = _.pick(req.body, [
        "email",
        "password"
    ]);
    body.password = bcrypt.hashSync(body.password, 16);

    let newUser = new User(body);

    newUser.save((err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        let token = jwt.sign({
                user
            },
            process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN }
        );

        res.json({
            ok: true,
            user,
            token
        });
    });
};

let UpdateUser = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["name", "lastName", "email", "phone"]);
    if (req.body.password) {
        body.password = bcrypt.hashSync(req.body.password, 16);
    }

    User.findByIdAndUpdate(
        id,
        body, { new: true, runValidators: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                user
            });
        }
    );
};


module.exports = {
    SignUp,
    UpdateUser,
    LoginUser
};
