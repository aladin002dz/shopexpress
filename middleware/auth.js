const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const decodedUserId = decodedToken.userId;
    req.auth = {
      userId: decodedUserId,
    };
    next();
  } catch {
    console.log("error==========================");
    console.log(error);
    res.status(401).json({
      error,
    });
  }
};
