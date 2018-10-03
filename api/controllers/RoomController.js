/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
'use strict';

module.exports = {

  index: function (req, res) {
    Room.find().populate("users").exec(function (err, rooms) {
      return res.view({rooms: rooms});
    })
  },

  create: function (req, res) {
    var body = req.body;
    Room.create(body).exec(function (err, rooms) {
      return res.redirect('/');
    })
  },

  destroy: function (req, res) {
    var id = req.param("id");
    Room.destroy({id: id}).exec(function (err, rooms) {
      return res.redirect('/');
    })
  },

  edit: function (req, res) {
    var id = req.param("id");
    Room.findOne({id: id}).exec(function (err, room) {
      return res.view({room: room});
    })
  },

  update: function (req, res) {
    var id = req.param("id");
    var body = req.body;
    Room.update(id, body).exec(function (err, users) {
      return res.redirect('/');
    })
  },

  book: function (req, res) {
    var body = req.body;
    var id = req.param("id");
    var userId = req.param("userId");
    Room.findOne({id: id})
      .populate("users")
      .then(function (thisroom) {
        var user = User.findOne({id: userId})
          .then(function (u) {
            return u;
          });
        return [thisroom, user];
      }).spread(function (room, user) {
      if (room && user) {
        addUser(room, user);
        return res.redirect("/room/mybook");
      } else {
        return res.notFound("not found");
      }
    }).catch(function (err) {
      if (err) {
        return res.serverError(err);
      }
    });

  },

  cancelbook: function (req, res) {
    var body = req.body;
    var id = req.param("id");
    var userId = req.param("userId");
    Room.findOne({id: id})
      .populate("users")
      .then(function (thisroom) {
        var user = User.findOne({id: userId})
          .then(function (u) {
            return u;
          });
        return [thisroom, user];
      }).spread(function (room, user) {
      if (room && user) {
        removeUser(room, user);
        return res.redirect("/room/mybook");
      } else {
        return res.notFound("not found");
      }
    }).catch(function (err) {
      if (err) {
        return res.serverError(err);
      }
    });

  },

  mybook: function (req, res) {
    var body = req.body;
    var id = req.param("id");
    var userId = req.session.user.id;
    User.findOne({id: userId})
      .populate("rooms")
      .exec(function (err, user) {
        return res.view({user: user});
      })
  },

  new: function (req, res) {
    return res.view();
  }

}


async function updateRoom(id, body) {
  return await Room.update(id).set(body);
}

async function addUser(room, user) {
  return await Room.addToCollection(room.id, 'users', user.id);
}

async function removeUser(room, user) {
  return await Room.removeFromCollection(room.id, 'users', user.id);
}

