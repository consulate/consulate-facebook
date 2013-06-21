/**
 * Module dependencies
 */
var debug = require('simple-debug')('consulate-facebook')
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

/**
 * Facebook Exchange Plugin
 */

module.exports = function(options) {
  var path = options.path || '/auth/facebook'
    , getUserByFacebookOrCreate = options.getUserByFacebookOrCreate;

  debug('registering facebook passport strategy with options', options)

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
    app.get(path, app.authenticate('facebook', getUserByFacebookOrCreate), app.viewCallback('login'));
  };
};
