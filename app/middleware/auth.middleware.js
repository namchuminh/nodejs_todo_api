const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token không tồn tại" });
    }
    try {
        const decoded = jwt.verify(token, "ABC");
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ err });
    }
};

module.exports = auth;