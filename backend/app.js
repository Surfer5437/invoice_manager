"use strict";

/** Express app for invoice manager. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const usersRoutes = require("./routes/users");
const invoicesRoutes = require("./routes/invoices");
const logoRoutes = require("./routes/logos");
const jwt = require('jsonwebtoken')
const morgan = require("morgan");
const { ACCESS_TOKEN_SECRET } = require("./config");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

function authenticate(req, res, next) {

  
  const token = req.cookies.jwt; // Retrieve JWT token from the cookie
  console.log(token)
  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }
    next();
  });
}

app.use("/auth", authRoutes);
app.use("/companies", authenticate, companiesRoutes);
app.use("/users", usersRoutes);
app.use("/invoices", invoicesRoutes);
app.use("/logos", express.static('logos'));

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
