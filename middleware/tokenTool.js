const jwt = require("jsonwebtoken");
const Concerts = require("../models/concertModel.js");

const tokenDecipher = async (req, res, next) => {
  let token;

  if (
    req.body.token &&
    req.body !== ""
  ) {
    try {
      // get token from header
      token = req.body.token

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
      // get user form token
      req.user = await Concerts.findById(decoded.id);
      next();
    } catch (err) {
      console.log(err + " middleware");
      res.status(401).json({ message: err.message });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Unauthorized, no ticket token" });
  }
};

module.exports = { tokenDecipher };
