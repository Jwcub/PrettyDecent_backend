// Validate token
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: "Not authorized for this route - token missing!" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, email) => {
        if(err) return res.status(403).json({ message: "Unvalid JWT" });
        req.email = email;
        next();
    });
}

module.exports = authenticateToken;