const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            type: 'unauthorized',
            message: 'Token no proporcionado'
        });
    }

    try {
        const payload = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.uid = payload.uid;
        next();
    } catch (error) {
        console.error('JWT error:', error.message);
        return res.status(401).json({
            type: 'unauthorized',
            message: 'Token inválido o expirado'
        });
    }
};

module.exports = validateJWT;
