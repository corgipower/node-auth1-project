const Auth = require('./auth-model');
const bcrypt = require('bcryptjs');

function restrict() {
    return async (req, res, next) => {
        try {
            if(!req.session || !req.session.user) {
                return res.status(401).json({
                    message: 'Authentication failed',
                })
            }

            next();
        }
        catch (err) {
            next(err);
        }
    }
}

module.exports = {
    restrict,
}