const express = require('express');

const router = express.Router();
const passport = require('passport');
const allRecipeController = require('../controllers/allRecipeController');

// All Recipes Route
router.post('/all-recipes', passport.authenticate('jwt', { session: false }), allRecipeController.postToAllRecipes);

router.get('/all-recipes', allRecipeController.getAllRecipes);

module.exports = router;
