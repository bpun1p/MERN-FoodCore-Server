/* eslint-disable func-names */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt'); // encrypts the password incases of db getting compromised

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 15,
  },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recipe' }],
});

// hash the password before saving
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 10, (err, passwordHash) => { // 10 = strength of ecyption
    if (err) return next(err);
    this.password = passwordHash;
    next();
  });
});

// compares the plain text password from client to the hashpassword in db
userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);

    if (!isMatch) return cb(null, isMatch);
    return cb(null, this); // 'this' attaches to the user object to the request object
  });
};

module.exports = mongoose.model('UsersData', userSchema);
