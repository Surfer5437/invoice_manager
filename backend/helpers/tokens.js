const jwt = require("jsonwebtoken");
const {  ACCESS_TOKEN_SECRET, REFRESH_ACCESS_TOKEN } = require("../config");

/** return signed JWT from user data. */

function createAccessToken(user) {
  console.assert(user.is_admin !== undefined,
      "createToken passed user without is_admin property");

  let payload = {
    username: user.username,
    is_admin: user.is_admin || false,
    company_id:user.company_id
  };

  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '10s'});
}

function createRefreshToken(user){
  console.assert(user.is_admin !== undefined,
    "createToken passed user without is_admin property");

let payload = {
  username: user.username,
  is_admin: user.is_admin || false,
};

return jwt.sign(payload, REFRESH_ACCESS_TOKEN, { expiresIn: '1d'});
}

module.exports = { createAccessToken, createRefreshToken };
