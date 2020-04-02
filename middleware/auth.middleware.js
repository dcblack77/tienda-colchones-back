require("../config");
const jwt = require("jsonwebtoken");

// =====================
// Verificar Token
// =====================
let verifyToken = (req, res, next) => {
    let token = req.get("token");

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token invalid"
                }
            });
        }

        req.user = decoded.user;
        next();
    });
};

// =====================
// Verify AdminRole
// =====================
let verifyAdmin = (req, res, next) => {
    let user = req.user;

    if (user.role === "ADMIN_ROLE") {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: "The user is not admin"
            }
        });
    }
};

module.exports = {
    verifyToken,
    verifyAdmin
};
