const express = require('express');
let router = express.Router();
var {Mobile} = require("../../models/mobiles");
var  validateMob = require("../../middleware/validateMob"); 

//get all data
router.get('/', async (req, res) => {
    console.log("get method");
    let mobiles = await Mobile.find();
    return res.render('components/shop', {mobiles: mobiles});
});
//get data by id
router.get('/:id', async (req, res) => {
    try{
        
        let mobile = await Mobile.findById(req.params.id);
        if(!mobile){
            return res.status(404).send("Mobile not found");
        }
        return res.send(mobile)
    }catch(err){
        return res.status(400).send("Invalid ID")
    }
});
//update data by id
router.put('/:id', async (req, res) => {
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
        return res.send(mobile)
    }catch(err){
        return res.status(400).send("Invalid ID")
    }
});
//delete data by id
router.delete('/:id', async (req, res) => {
    try{
        let mobile = await Mobile.findByIdAndDelete(req.params.id);
        if(!mobile){
            return res.status(404).send("Mobile not found");
        }
        return res.send(mobile)
    }catch(err){
        return res.status(400).send("Invalid ID")
    }
});
//add data
router.post("/",validateMob ,async (req, res) => {

    let mobile = new Mobile();
    mobile.name = req.body.name;
    mobile.price = req.body.price;
    mobile.description = req.body.description;
    mobile.RAM = req.body.RAM;
    mobile.ROM = req.body.ROM;
    await mobile.save();
    return res.send(mobile)
});

module.exports = router;