const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  const bearerToken = token?.split(' ')

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(bearerToken[1], process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "You are unauthorized!"
      });
    }
    req.user_id = decoded.id;
    req.username = decoded.username;
    next();
  });
};