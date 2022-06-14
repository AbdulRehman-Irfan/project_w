function sessionAuth(req,res,next){
  console.log(req.session.user)
    res.locals.user = req.session.user;
    res.locals.isAdmin = false;
    if(req.session.user){
        res.locals.isAdmin = Boolean(
            req.session.user.email.endsWith("@admin.com")
            );
      
        }
    next();
}

module.exports = sessionAuth;