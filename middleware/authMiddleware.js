const jwt = require('jsonwebtoken');
// const dotenv = require("dotenv")


// dotenv.config()

const authMiddleware = async (req, res, next) => {
    // console.log("Headers:", req.headers);

    // if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
    //     return res.status(400).send({ message: "Token is not found", success: false });
    // }

    // const token = req.headers.authorization.split(" ")[1];
    
    // console.log(req.cookies.auth_token);
    const token = req.cookies.auth_token
    // const token = req.cookies.token
    if (!token) {
        return res.status(400).send({ message: "Token is not found", success: false });
    }
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("Verified userId:", userId);
        if(!userId) {
            return res.status(401).send({ message: "User not found", success: false });
        }
        req.userId = userId;
        next();
    } 
    catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).send({ message: "Invalid token", success: false });
    }
};


module.exports = authMiddleware;
