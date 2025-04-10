const isAuth = (req, res, next) => {
  if (!req.session || !req.session.isAuth) {
    req.flash('error', 'You need to log in first.');
    return res.redirect('/login');
  }
  next();
};

module.exports = isAuth;


// middleware/authMiddleware.js
const currentUser = (req, res, next) => {
  res.locals.currentUser = req.session.user;
  next();
};
module.exports = currentUser;