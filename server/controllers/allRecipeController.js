const Recipe = require('../models/allRecipe');

function postToAllRecipes(req, res) {
  const allRecipe = new Recipe(req.body);
  allRecipe.save((err) => {
    if (err) res.status(500).json({ message: { msgBody: 'error has occured132', msgError: true } });
    else res.status(200).json({ message: { msgBody: 'post successful', msgError: false } });
  });
}

function getAllRecipes(req, res) {
  Recipe.find().sort({ createdAt: -1 })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => res.sent(err));
}

module.exports = {
  postToAllRecipes,
  getAllRecipes,
};
