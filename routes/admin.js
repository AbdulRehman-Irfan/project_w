var express = require('express');
var router = express.Router();
var {Mobile} = require("../models/mobiles");
var  validateMob = require("../middleware/validateMob"); 
var {User} = require("../models/User");
var bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require("config")
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, "public/images/uploades");
    },
    filename: (req, file, callBack) => {
        let ext = path.extname(file.originalname);
        callBack(null, Date.now() + ext);
    },
  });
  let upload = multer({ storage });

router.get('/', function(req, res, next) {
    res.render('admin/main');
    }
);
router.get('/mobiles', async (req, res) => {
    let mobiles = await Mobile.find();
    return res.render('admin/mob', {mobiles: mobiles});
});

//delete data by id
router.get('/mobiles/delete/:id', async (req, res) => {
    try{
        let mobile = await Mobile.findByIdAndDelete(req.params.id);
        if(!mobile){
            return res.status(404).send("Mobile not found");
        }
        return res.redirect("/admin/mobiles");
    }catch(err){
        return res.status(400).send("Invalid ID")
    }
});

router.get("/mobiles/add" ,upload.single("image"),async (req, res) => {
   return res.render("admin/add")
});
router.get("/mobiles/update" ,async (req, res) => {
    return res.render("admin/update")
 });
router.post("/mobiles" ,upload.single("image"),async (req, res) => {
    console.log("kooo",req.file);

    let mobile = new Mobile();
    mobile.name = req.body.name;
    mobile.price = req.body.price;
    mobile.description = req.body.description;
    mobile.RAM = req.body.RAM;
    mobile.ROM = req.body.ROM;
    if(req.file){
        mobile.image = req.file.filename;
    }
    mobile.image = '/images/2g.jpg'
    await mobile.save();
    return res.redirect("/admin/mobiles");
});
router.put('/:id',upload.single("image"), async (req, res) => {
    try{
        let mobile = await Mobile.findByIdAndUpdate(req.params.id);
       
        if(!mobile){
            return res.status(404).send("Mobile not found");
        }
        mobile.name = req.body.name;
        mobile.price = req.body.price;
        mobile.description = req.body.description;
        mobile.RAM = req.body.RAM;
        mobile.ROM = req.body.ROM;
        if(req.file){
            mobile.image = req.file.filename;
        }
        await mobile.save();
        return res.send(mobile)
    }catch(err){
        return res.status(400).send("Invalid ID")
    }
});
router.get('/mobiles/update/:id', async (req, res) => {
    try{
        
        let mobile = await Mobile.findById(req.params.id);
        if(!mobile){
            return res.status(404).send("Mobile not found");
        }
        return res.render('admin/update', {mobile: mobile});
    }catch(err){
        return res.status(400).send("Invalid ID")
    }
});
router.post('/mobiles/update/:id', async (req, res) => {
    try{
        let mobile = await Mobile.findByIdAndUpdate(req.params.id);
       
        if(!mobile){
            return res.status(404).send("Mobile not found");
        }
        mobile.name = req.body.name;
        mobile.price = req.body.price;
        mobile.description = req.body.description;
        mobile.RAM = req.body.RAM;
        mobile.ROM = req.body.ROM;
        await mobile.save();
        return res.redirect("/admin/mobiles");
    }catch(err){
        return res.status(400).send("Invalid ID")
    }
});
module.exports = router;



