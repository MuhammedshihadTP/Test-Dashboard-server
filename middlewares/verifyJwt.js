// authMiddleware.js
const jwt = require("jsonwebtoken");
const secretKey = 'jwt';

const verifyAdmin = (req, res, next) => {
  const token = req.header("token");
  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

module.exports = {
  verifyAdmin,
};
