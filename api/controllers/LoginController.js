/**
 * LoginController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var passport = require('passport');
var bcrypt = require('bcrypt');

module.exports = {


  index: function (req, res) {
    res.view();
  },

  login: function (req, res) {
    passport.authenticate(
      'local',
      function (err, user, info) {
        if ((err) || (!user)) {
          res.redirect('/login');
          return;
        }
        req.session.user = user;
        req.session.authorized = true;
        return res.redirect("/");
      }
    )(req, res);
  },

  oauth: function (req, res) {
    var body = req.body;
    User.findOne({
      email: body.email
    }, function (err, user) {

      if (err) {
        return res.serverError(err);
      }
      if (!user) {
        return res.notFound("User not found");
      }
      bcrypt.compare(body.password, user.hashedPassword, function (err, resHash) {
        if (err || !resHash) {
          return res.notFound("User or password not found");
        } else {
          bcrypt.hash(user.hashedPassword + new Date().getTime(), 10, function (err, hash) {
            if (err) return res.serverError(err);
            updateUser(user, {accessToken: hash}).then(function (data) {
              return res.send(data);
            });
          });
        }
      });
    });
  },

  logout: function (req, res) {
    req.session.user = null;
    req.session.authorized = false;
    return res.redirect("/");
  }
};

async function updateUser(user, data) {
  var updatedUsers = await User.update({id:user.id})
    .set(data)
    .fetch();
  delete updatedUsers[0].hashedPassword;
  return updatedUsers[0];
}

