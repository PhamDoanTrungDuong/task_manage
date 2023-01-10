const jwt = require("jsonwebtoken");
const User = require('../models/User')

const verifyToken = (req, res, next) => {
  //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  const token = req.headers.token;
  const refreshToken = req.cookies.refreshToken;
  if (token) {
    const accessToken = token.split(" ")[1];
    if(!accessToken) res.status(401).json("You're not authenticated!!");
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, async (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid!");
      }
      const userUnit = await User.findOne({ _id: user.id })
      
      req.user = userUnit;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
};
