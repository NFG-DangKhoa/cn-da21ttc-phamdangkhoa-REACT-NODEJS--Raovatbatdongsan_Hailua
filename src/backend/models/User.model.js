// File: models/User.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema with the 'role' field
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'user'],  // Allow only these three roles
        default: 'user'  // Default role is 'buyer'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Create the model based on the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;

