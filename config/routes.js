/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': 'RoomController.index',

  'get /login': "LoginController.index",
  'post /login': "LoginController.login",
  'get /logout': "LoginController.logout",
  'post /oauth': "LoginController.oauth",

  //User Controller
  'get /user': "UserController.index",
  'get /user/new': "UserController.new",
  'get /user/register': "UserController.register",
  'post /user': "UserController.create",
  'post /user/submitRegister': "UserController.submitRegister",
  'post /user/update/:id': "UserController.update",
  'get /user/destroy/:id': "UserController.destroy",
  'get /user/edit/:id': "UserController.edit",

  //Room Controller
  'get /room': "RoomController.index",
  'get /room/new': "RoomController.new",
  'post /room': "RoomController.create",
  'post /room/update/:id': "RoomController.update",
  'get /room/edit/:id': "RoomController.edit",
  'get /room/book/:id/:userId': "RoomController.book",
  'get /room/cancelbook/:id/:userId': "RoomController.cancelbook",
  'get /room/mybook': "RoomController.mybook",

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  //API Room v1
  'get /v1/room': "v1/RoomController.index",
  'get /v1/room/book/:id': "v1/RoomController.book",
  'get /v1/room/cancelbook/:id': "v1/RoomController.cancelbook",


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
