/**
 * Module dependencies
 */
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

/**
 * Facebook Exchange Plugin
 */

module.exports = function(options) {
  var path = options.path || '/auth/facebook'
    , getUserByFacebookOrCreate = options.getUserByFacebookOrCreate;

  passport.use(new FacebookStrategy({
    clientID: options.clientID,
    clientSecret: options.clientSecret,
    callbackURL: options.callbackURL
  }, function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    done(null, profile);
  }));

  return function(app) {
    app.use(path, app.authenticate('facebook', getUserByFacebookOrCreate), function(req, res, next) {
      // The user didn't end up logging in through facebook
      // TODO figure out how to pass on the error to the login page
      res.redirect('/login');
    });
  };
};
