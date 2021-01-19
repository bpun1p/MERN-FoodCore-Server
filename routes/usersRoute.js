const express = require('express');

const router = express.Router();
const passport = require('passport');
// eslint-disable-next-line no-unused-vars
const passportConfig = require('../passport');
const usersController = require('../controllers/usersController');

// middleware
router.use(express.urlencoded({ extended: true }));

// Users Route
router.post('/register', usersController.registerUser);

router.post('/login', passport.authenticate('local', { session: false }), usersController.loginUser);

router.get('/logout', passport.authenticate('jwt', { session: false }), usersController.logoutUser);

router.post('/recipes', passport.authenticate('jwt', { session: false }), usersController.addUsersRecipe);

router.get('/recipes', passport.authenticate('jwt', { session: false }), usersController.getUsersRecipe);

router.get('/authenticated', passport.authenticate('jwt', { session: false }), usersController.authenticateUser);

module.exports = router;
