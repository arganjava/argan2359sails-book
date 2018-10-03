var bcrypt = require('bcrypt');

var password;
module.exports.seeds = {
  user: [
    {
      email: 'companyadmin@andaz.grid',
      hashedPassword: "1234",
      privilege: "admin"
    }
  ]
}
