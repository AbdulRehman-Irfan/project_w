const jwt = require("jsonwebtoken");
const config = require("config");
const {User} = require("../models/User");
async function authen(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.redirect("/login");
  try {
    let decoded = jwt.verify(token, config.get("jwt_secret"));
    req.user = await User.findById(decoded._id);
    next();
  } catch (ex) {
    return res.redirect("/login");
  }
}
module.exports = authen;