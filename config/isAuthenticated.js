/**
 * Login Required middleware.
 */
let isAuthenticated = (req, res, next) => {
  console.log('isAuthenticated?')
  if (req.isAuthenticated()) {
    return next()
  }
  console.log('Nope')
  res.redirect( `/login?origin=${req.originalUrl}` )
};

exports = module.exports = isAuthenticated;