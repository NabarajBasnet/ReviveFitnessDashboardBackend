const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.loginToken;

    if (!token) {
        res.status(401).json({
            message: 'Unauthorized',
            redirect: '/login'
        })
    };

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        const decodedUser = req.user
        next();
    } catch (error) {
        console.log("Error: ", error);
        return res.status(403).json({
            message: 'Invalid token'
        });
    };

};

module.exports = auth;
