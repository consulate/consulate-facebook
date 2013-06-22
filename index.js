/**
 * Module dependencies
 */
var debug = require('simple-debug')('consulate-facebook')
  , passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

/**
 * Facebook Exchange Plugin
 */

module.exports = function(options, getUserByFacebookOrCreate) {
  if (!getUserByFacebookOrCreate) throw new Error('`getUserByFacebookOrCreate` callback required for `consulate-facebook`');

  var path = options.path || '/login/facebook';
  delete options.path;

  debug('registering facebook passport strategy with options', options)

  passport.use(new FacebookStrategy(options, getUserByFacebookOrCreate));

  return function(app) {
    app.get(path, app.authenticate('facebook'), app.viewCallback('login'));
  };
};
