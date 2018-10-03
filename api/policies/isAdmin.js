module.exports = function isLogin(req, res, next) {
  if (req.session.user.privilege !== "admin") {
    return res.forbidden("you are not autoried access this page");
  }
  return next();
};
