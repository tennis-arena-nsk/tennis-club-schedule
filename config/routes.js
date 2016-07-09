'use strict';


/**
 * Controllers (route handlers).
 */
const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const scheduleController = require('../controllers/schedule');
const contactController = require('../controllers/contact');

/**
 * Login Required middleware.
 */
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
const isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};

exports = module.exports = (app, passport) => {
  /**
   * Primary app routes.
   */
  app.get('/', homeController.index);
  app.get('/login', userController.getLogin);
  app.post('/login', userController.postLogin);
  app.get('/logout', userController.logout);
  app.get('/forgot', userController.getForgot);
  app.post('/forgot', userController.postForgot);
  app.get('/reset/:token', userController.getReset);
  app.post('/reset/:token', userController.postReset);
  app.get('/signup', userController.getSignup);
  app.post('/signup', userController.postSignup);
  app.get('/contact', contactController.getContact);
  app.post('/contact', contactController.postContact);

  app.get('/account', isAuthenticated, userController.getAccount);
  app.post('/account/profile', isAuthenticated, userController.postUpdateProfile);
  app.post('/account/password', isAuthenticated, userController.postUpdatePassword);
  app.post('/account/delete', isAuthenticated, userController.postDeleteAccount);
  app.get('/account/unlink/:provider', isAuthenticated, userController.getOauthUnlink);

  /**
   * Tennis club schedule routes for API & views.
   TODO: convert to REST endpoints to manage resources / schedules */
  // TODO: attach separate router for resource controller
  app.get ('/schedules',    scheduleController.getList );
  app.get ('/schedules/:scheduleId', scheduleController.getItem );
  app.post('/schedules/:scheduleId', scheduleController.saveItem);
  app.del ('/schedules/:scheduleId', scheduleController.delItem );

  app.get('/reservations', reservationController.getReservation);
  app.get('/resources',   scheduleController.getResources);

  app.get('/account/reservation', isAuthenticated, scheduleController.getAccountReservation);

  /**
   * OAuth authentication routes. (Sign in)
   */
  app.get('/auth/instagram', passport.authenticate('instagram'));
  app.get('/auth/instagram/callback', passport.authenticate('instagram', {failureRedirect: '/login'}), (req, res) => {
    res.redirect(req.session.returnTo || '/');
  });
  app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_location']}));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), (req, res) => {
    res.redirect(req.session.returnTo || '/');
  });
  app.get('/auth/github', passport.authenticate('github'));
  app.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/login'}), (req, res) => {
    res.redirect(req.session.returnTo || '/');
  });
  app.get('/auth/google', passport.authenticate('google', {scope: 'profile email'}));
  app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
    res.redirect(req.session.returnTo || '/');
  });
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), (req, res) => {
    res.redirect(req.session.returnTo || '/');
  });
  app.get('/auth/linkedin', passport.authenticate('linkedin', {state: 'SOME STATE'}));
  app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {failureRedirect: '/login'}), (req, res) => {
    res.redirect(req.session.returnTo || '/');
  });

  /**
   * OAuth authorization routes. (API examples)
   */
  app.get('/auth/foursquare', passport.authorize('foursquare'));
  app.get('/auth/foursquare/callback', passport.authorize('foursquare', {failureRedirect: '/api'}), (req, res) => {
    res.redirect('/api/foursquare');
  });
  app.get('/auth/tumblr', passport.authorize('tumblr'));
  app.get('/auth/tumblr/callback', passport.authorize('tumblr', {failureRedirect: '/api'}), (req, res) => {
    res.redirect('/api/tumblr');
  });
  app.get('/auth/venmo', passport.authorize('venmo', {scope: 'make_payments access_profile access_balance access_email access_phone'}));
  app.get('/auth/venmo/callback', passport.authorize('venmo', {failureRedirect: '/api'}), (req, res) => {
    res.redirect('/api/venmo');
  });
  app.get('/auth/steam', passport.authorize('openid', {state: 'SOME STATE'}));
  app.get('/auth/steam/callback', passport.authorize('openid', {failureRedirect: '/login'}), (req, res) => {
    res.redirect(req.session.returnTo || '/');
  });
  app.get('/auth/pinterest', passport.authorize('pinterest', {scope: 'read_public write_public'}));
  app.get('/auth/pinterest/callback', passport.authorize('pinterest', {failureRedirect: '/login'}), (req, res) => {
    res.redirect('/api/pinterest');
  });

};