consulate-facebook
==================

Facebook exchange plugin for [consulate](https://github.com/consulate/consulate).

`consulate-facebook` allows users to login/register with Facebook and exchange
a Facebook access_token for a consulate authorization code.

Usage
-----

Just register `consulate-facebook` as a plugin with your [consulate](https://github.com/consulate/consulate) server:

```js
var consulate = require('consulate')
  , facebook = require('consulate-facebook');

var app = consulate();

app.plugin(facebook({
  clientID: 'MY_FACEBOOK_CLIENT_ID',
  clientSecret: 'MY_FACEBOOK_CLIENT_SECRET',
  callbackURL: 'MY_FACEBOOK_CALLBACK_URL'
}, function(facebookUser, done) {

  // lookup user by facebook id here. if they don't exist create them
  ...

  // Return the user for your consulate system
  done(null, myUser);
}));
```

Tests
-----

```sh
$ npm test
```
