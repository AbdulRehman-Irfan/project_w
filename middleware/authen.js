const jwt = require("jsonwebtoken");
const config = require("config");
const {User} = require("../models/User");
async function authen(req, res, next) {

  let token = req.header("x-auth-token");
  if (!token) 
  return res.redirect("/login",{error:""});
  try {
    let decoded = jwt.verify(token, config.get("jwt_secret"));
    const user= await User.findOne(decoded._id);
    if (!user) return res.redirect("/login",{error:""});
    req.user=user;
    next();
  } catch (error) {
    return res.redirect("/login",{error:""});
  }
}

module.exports = authen;