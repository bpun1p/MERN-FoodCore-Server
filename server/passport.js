const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/user');

// extracts cookie from req
const cookieExtractor = (req) => {
  if (req && req.cookies) return req.cookies.access_token;
  return null;
};

// authorization to endpoints
passport.use(new JwtStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: 'Food_Core', // secretOrKey is used to verify whether the token is authentic
}, (payload, done) => { // data we set within our jwt token
  User.findById({ _id: payload.sub }, (err, user) => {
    if (err) return done(err, false);
    if (user) return done(null, user);
    return done(null, false);
  });
}));

// authentication local strategy using username and password
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    // error in database
    if (err) return done(err);
    // user non-existent
    if (!user) return done(null, false);
    // check if password is correct
    return user.comparePassword(password, done);
  });
}));
