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

let GetUsers = (req, res) => {
    let limit = req.query.limit || 5;
    limit = Number(limit);
    let desde = req.query.desde || 0;
    desde = Number(desde);

    User.find({ checked: true, deleted_at: null }, "name email google")
        .skip(desde)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            User.count({ checked: true, deleted_at: null }, (err, cont) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                res.json({
                    ok: true,
                    cont,
                    users
                });
            });
        });
};

let GetUser = (req, res) => {
    let id = req.params.id;
    User.findById({ id, checked: true, deleted_at: null }, (err, user) => {
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

let DeleteUser = (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(id, { deleted_at: Date.now() }, (err, user) => {
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
    });
};

let DestroyUser = (req, res) => {
    let id = req.params.id;
    User.findByIdAndDelete(id, (err, destroy) => {
        if (err) res.status(400).json({ ok: false, err });
        res.json({
            ok: true,
            destroy
        });
    });
};

module.exports = {
    SignUp,
    GetUsers,
    GetUser,
    UpdateUser,
    DeleteUser,
    DestroyUser,
    LoginUser
};
