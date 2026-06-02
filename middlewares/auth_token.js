// Validate token
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: "Du saknar behörighet för den här sidan" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, email) => {
        if(err) return res.status(403).json({ message: "Ogiltig token" });
        req.email = email;
        next();
    });
}

module.exports = authenticateToken;