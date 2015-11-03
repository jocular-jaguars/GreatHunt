var jwt = require('jwt-simple');

module.exports = {
  errorLogger: function (error, req, res, next) {
    // log the error then send it to the next middleware in
    // middleware.js

    console.error(error.stack);
    next(error);
  },
  errorHandler: function (error, req, res, next) {
    // send error message to client
    // message for gracefull error handling on app
    res.send(500, {error: error.message});
  },

  decode: function (req, res, next) {
    var token = req.headers['x-access-token'];
    console.log("this is the token from client: " + token);
    var user;
    if (!token) {
      console.log("no token sent");
      return res.send(403); // send forbidden if a token is not provided
    }
    try {
      // decode token and attach user to the request
      user = jwt.decode(token, 'secret');
      console.log(user);
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  }
};