module.exports = function isLogin(req, res, next) {
  var accessToken = req.header('Authorization');

  // No header, no access
  if (accessToken) {
    accessToken = accessToken.replace("Bearer ", "");
    // Find the user with that token
    User.findOne({accessToken: accessToken})
      .exec(function (err, user) {
        // Handle error
        if (err) {
          return next(err);
        }
        // Handle bad access token
        if (!user) {
          return res.forbidden();
        }
        // Handle success
        req.user = user;
        return next();
      });
  } else {
    if (!req.session.authorized) {
      return res.redirect("/login");
    }
    return next();
  }
};
