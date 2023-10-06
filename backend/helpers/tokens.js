const jwt = require("jsonwebtoken");
const {  ACCESS_TOKEN_SECRET, REFRESH_ACCESS_TOKEN } = require("../config");

/** return signed JWT from user data. */

function createAccessToken(user) {
  console.assert(user.isAdmin !== undefined,
      "createToken passed user without isAdmin property");

  let payload = {
    username: user.username,
    isAdmin: user.isAdmin || false,
  };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1h'});
}

function createRefreshToken(user){
  console.assert(user.isAdmin !== undefined,
    "createToken passed user without isAdmin property");

let payload = {
  username: user.username,
  isAdmin: user.isAdmin || false,
};

return jwt.sign(payload, REFRESH_ACCESS_TOKEN, { expiresIn: '1d'});
}

module.exports = { createAccessToken, createRefreshToken };
