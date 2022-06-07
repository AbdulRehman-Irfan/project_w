const mongoose = require("mongoose");
var joi = require('@hapi/joi');
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);
module.exports.User = User;

function validateUser(data){
    const schema = joi.object({
        name: joi.string().min(2).required(),
        email: joi.string().min(2).required(),
        password: joi.string().min(2).max(9).required(),
    });
    return schema.validate(data,{abortEarly: false});
}
function validateUserLogin(data){
    const schema = joi.object({
        email: joi.string().min(2).required(),
        password: joi.string().min(2).max(9).required(),
    });
    return schema.validate(data,{abortEarly: false});
}
module.exports.validate = validateUser;
module.exports.validateLogin = validateUserLogin;

