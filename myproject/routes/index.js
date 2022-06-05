var express = require('express');
var router = express.Router();
var {Mobile} = require("../models/mobiles");
var  validateMob = require("../middleware/validateMob"); 
var {User} = require("../models/User");


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
  return res.render("components/login");
});

router.get("/register", function (req, res, next) {
  return res.render("components/register");
}  );

module.exports = router;
