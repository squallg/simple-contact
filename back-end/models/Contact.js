/*
 * Contact Model
 */

/* Mongoose import */
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    lastname: String,
    firstname: String,
    email: String,
    phone: Number
});

module.exports = mongoose.model('Contact', ContactSchema);