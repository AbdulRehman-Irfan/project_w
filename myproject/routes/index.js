var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('components/homepage', { title: 'Express' });
});
router.get("/contact", function (req, res, next) {
  return res.render("components/contact");
});
router.get("/api/mobiles", function (req, res, next) {
  return res.render("components/shop" , );
});

module.exports = router;
