var express = require('express');
var router = express.Router();
var {Mobile} = require("../models/mobiles");
var  validateMob = require("../middleware/validateMob"); 
var {User} = require("../models/User");
var bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require("config")
var authen = require("../middleware/authen");




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('components/homepage', { title: 'Express' });
});
router.get("/contact", function (req, res, next) {
  return res.render("components/contact");
});
router.get("/cart", async function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  let mobiles = await Mobile.find({ _id: { $in: cart } });

  let total = mobiles.reduce(
    (total, mobile) => total + Number(mobile.price),
    0
  );

  res.render("components/cart", { mobiles, total });
});
router.get("/login", function (req, res, next) {
  return res.render("components/login", { error: ""});
});
router.post("/login", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) 
  return res.render("components/login",{error:"User Not Exist"});

  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid)
   return res.render("components/login",{error:"Invalid Password"});

  let token = jwt.sign({ _id: user._id,name: user.name , email: user.email},config.get("jwt_secret"));
  req.session.user = user;
  return res.redirect("/");

} );
router.get("/logout", function (req, res, next) {
  req.session.destroy();
  return res.redirect("/");
}
);


router.get("/register", function (req, res, next) {
  return res.render("components/register");
}  );
router.post("/register", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.redirect("/register");
  }
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  let salt =await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  return res.redirect("/login",{error:""});
});

module.exports = router;
