/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const Recipe = require('../models/userRecipe');

const signToken = (userID) => JWT.sign({
  iss: 'Food_Core',
  sub: userID,
}, 'Food_Core', { expiresIn: '24h' });

function registerUser(req, res) {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) res.status(500).json({ message: { msgBody: 'error has occured', msgError: true } });
    if (user) res.status(400).json({ message: { msgBody: 'username is already used', msgError: true } });
    else {
      const newUser = new User({ username, password });
      newUser.save((err) => {
        if (err) res.status(500).json({ message: { msgBody: 'error has occured', msgError: true } });
        else res.status(201).json({ message: { msgBody: 'account successfully created', msgError: false } });
      });
    }
  });
}

function loginUser(req, res) {
  if (req.isAuthenticated()) {
    const { _id, username } = req.user;
    const token = signToken(_id);
    res.cookie('access_token', token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { username } });
  }
}

function logoutUser(_req, res) {
  res.clearCookie('access_token');
  res.json({ user: { username: '' }, success: true });
}

function addUsersRecipe(req, res) {
  const recipe = new Recipe(req.body);
  recipe.save((err) => {
    if (err) res.status(500).json({ message: { msgBody: 'error has occured', msgError: true } });
    else {
      req.user.recipes.push(recipe);
      req.user.save((err) => {
        if (err) res.status(500).json({ message: { msgBody: 'error has occured', msgError: true } });
        else res.status(200).json({ message: { msgBody: 'successfully created recipe', msgError: false } });
      });
    }
  });
}

function getUsersRecipe(req, res) {
  User.findById({ _id: req.user._id }).populate('recipes').exec((err, document) => {
    if (err) res.status(500).json({ message: { msgBody: 'error has occured', msgError: true } });
    else res.status(200).json({ recipes: document.recipes, authenticated: true });
  });
}

function authenticateUser(req, res) {
  const { username } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { username } });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUsersRecipe,
  addUsersRecipe,
  authenticateUser,
};
