// import core modules
const router = require('express').Router()
const passport = require('passport')

exports = module.exports = class AuthRoutes {
  static init( app, mountPath ) {
    router.get('/instagram', passport.authenticate('instagram'));
    router.get('/instagram/callback', passport.authenticate('instagram', {failureRedirect: '/login'}), (req, res) => {
      res.redirect(req.session.returnTo || '/');
    });
    router.get('/facebook', passport.authenticate('facebook', {scope: ['email', 'user_location']}));
    router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), (req, res) => {
      res.redirect(req.session.returnTo || '/');
    });
    router.get('/google', passport.authenticate('google', {scope: 'profile email'}));
    router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
      res.redirect(req.session.returnTo || '/');
    });
    router.get('/twitter', passport.authenticate('twitter'));
    router.get('/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), (req, res) => {
      res.redirect(req.session.returnTo || '/');
    });

    app.use( mountPath, router )
  }


}
