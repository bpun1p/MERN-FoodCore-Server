/* eslint-disable no-console */
const express = require('express');

const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Middleware
app.use(cookieParser()); // parse the cookie stored in the web browser
app.use(bodyParser({ limit: '50mb' }));

const dbURI = 'mongodb+srv://FoodCore:Guy123su@cluster0.amii2.mongodb.net/FoodCore?retryWrites=true&w=majority';

// connect to mongodb
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => { console.log(`Listening at: http://localhost:${PORT}`); }))
  .catch((err) => console.log(err));

// Cross Origin Resource Sharing
const cors = require('cors');
const allRecipeRouter = require('./routes/allRecipeRoute');
const usersRouter = require('./routes/usersRoute');

app.use(cors({ origin: true, credentials: true }));

// Api routes
app.use('/user', usersRouter);
app.use('/', allRecipeRouter);
