/**
 * Module dependencies
 */
var debug = require('simple-debug')('consulate-facebook')
  , FacebookStrategy = require('passport-facebook').Strategy;

/**
 * Facebook Exchange Plugin
 */

module.exports = function(options, getUserByFacebookOrCreate) {
  if (!getUserByFacebookOrCreate) throw new Error('`getUserByFacebookOrCreate` callback required for `consulate-facebook`');

  var path = options.path || '/login/facebook';
  delete options.path;

  var name = options.name || 'facebook';

  if (!options.callbackURL) options.callbackURL = path;

  var authOpts = options.authOpts || {};
  delete options.authOpts;

  return function(app) {
    debug('registering facebook passport strategy with options', options);
    var strategy = new FacebookStrategy(options, getUserByFacebookOrCreate);
    strategy.name = name;
    app.register(strategy);
    app.get(path, app.authenticate(name, authOpts), app.viewCallback('login'));
  };
};
