const isAdmin = (req, res, next) => {
  if (req.session.isAuth && req.session.userRole === "admin") {
    return next();
  }
  return res.status(403).send("Access denied: Admins only");
};


module.exports = isAdmin;