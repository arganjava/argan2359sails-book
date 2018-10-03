var bcrypt = require('bcrypt');

var password;
module.exports.seeds = {
  user: [
    {
      email: 'argan@2359media.com',
      hashedPassword: "1234",
      privilege: "admin"
    }
  ]
}
