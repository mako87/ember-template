/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-template',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
      'font-src': "'self' data: https://fonts.gstatic.com/ ",
      'connect-src': "'self' ws://",
      'img-src': "'self' ",
      'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com/",
      'frame-src': "'self' "
    },

    flashMessageDefaults: {
      // flash message defaults
      timeout: 5000,
      extendedTimeout: 0,
      priority: 200,
      sticky: true,
      showProgress: true,

      // service defaults
      type: 'alpaca',
      types: [ 'error', 'teal' ],
      preventDuplicates: false
    },

    moment: {
      includeLocales: ['it']
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:token'
  };
  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: '/token-auth',
    identificationField: 'username',
    passwordField: 'password',
    tokenPropertyName: 'token',
    authorizationPrefix: 'Bearer ',
    authorizationHeaderName: 'Authorization',
    headers: {},
    refreshAccessTokens: true,
    serverTokenRefreshEndpoint: '/token-refresh',
    tokenExpireName: 'exp',
    refreshLeeway: 60,
    timeFactor: 1000  // example - set to "1000" to convert incoming seconds to milliseconds.
  };



  return ENV;
};
