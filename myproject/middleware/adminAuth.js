function adminAuth(req, res, next) {
  res.locals.isAdmin = false;
  if (req.session.user) {
    res.locals.isAdmin = Boolean(req.session.user.email.endsWith("@admin.com"));
  }
  if (res.locals.isAdmin) {
    next();
  } else {
    return res.render("components/login", { error: "Only Admin can access this page." });
  }
}

module.exports = adminAuth;
