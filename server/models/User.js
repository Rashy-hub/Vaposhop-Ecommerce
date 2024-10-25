// models/User.js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true }, // Separate first name field
    lastname: { type: String, required: true }, // Separate last name field
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    password: { type: String }, // For local auth users; optional for OAuth users
    googleId: { type: String, unique: true }, // For Google OAuth users; unique to prevent duplication
    createdAt: { type: Date, default: Date.now }, // Track when the user was created
    updatedAt: { type: Date, default: Date.now }, // Track last update time
})

// Middleware to update `updatedAt` before saving
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

module.exports = mongoose.model('User', userSchema)
