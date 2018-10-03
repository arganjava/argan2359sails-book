/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  index: function (req, res) {
    User.find().exec(function (err, users) {
      return res.view({users: users});
    })
  },

  create: function (req, res) {
    var body = req.body;
    User.create(body).exec(function (err, users) {
      return res.redirect("/user");
    })
  },

  destroy: function (req, res) {
    var id = req.param("id");
    User.destroy({id: id}).exec(function (err, users) {
      return res.redirect("/user");
    })
  },

  edit: function (req, res) {
    var id = req.param("id");
    User.findOne({id: id}).exec(function (err, user) {
      return res.view({user: user});
    })
  },

  update: function (req, res) {
    var body = req.body;
    var id = req.param("id");
    if(!body.hashedPassword){
      delete body.hashedPassword;
    }
    User.update(id, body).exec(function (err, users) {
      return res.redirect("/user");
    })
  },

  new: function (req, res) {
    return res.view();
  },

  register: function (req, res) {
    return res.view("user/register");
  },

  submitRegister: function (req, res) {
    var body = req.body;
    body.privilege = "customer";
    User.create(body).exec(function (err, users) {
      return res.redirect("/login");
    })
  },
};

