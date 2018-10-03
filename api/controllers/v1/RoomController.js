/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
'use strict';

module.exports = {

  index: function (req, res) {
    var user = req.user;
    retrieveBookAndAvailableRoom(user).then(function (data) {
      return res.json(data);
    })
  },


  book: function (req, res) {
    var body = req.body;
    var id = req.param("id");
    var userId = req.user.id;
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
        return res.send("Booked Success");
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
    var userId = req.user.id;
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
        return res.send("Cancel Booked Success");
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

}

async function retrieveBookRoom(user) {
  var user = await User.findOne({
    where: { id: user.id }
  }).populate("rooms");
  return user.rooms;
}

async function retrieveBookAndAvailableRoom(user) {
  var roomsUser = await retrieveBookRoom(user);
  var idRooms = _.pluck(roomsUser, "id");
  var rooms = await Room.find().populate("users");
  _.mixin({
    "findAvailableRoom": function (collection, property, values) {
      return _.filter(collection, function (item) {
        return !_.contains(values, item[property]);
      });
    }
  });
  var availables = _.findAvailableRoom(rooms, "id", idRooms);
  return {books:roomsUser, availables: availables};
}


async function addUser(room, user) {
  return await Room.addToCollection(room.id, 'users', user.id);
}

async function removeUser(room, user) {
  return await Room.removeFromCollection(room.id, 'users', user.id);
}

