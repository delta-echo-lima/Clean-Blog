const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');//Import bcyrpt

/**
 *Create user schema with validation configs
 */
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});

/**
 * Tell mongoose before any record is saved in Users collection execute the function
 * passed into 2nd argument. This will change user data before saving in db.
 *
 * Get the user being saved  with user = this then,
 * call bcrypt whose first argument takes in the password to be hashed,
 * second argument is number of times to hash password (10x)
 * 3rd argument is function called to replace password with hashed password
 * next() to continue the user creation.
 */
UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;