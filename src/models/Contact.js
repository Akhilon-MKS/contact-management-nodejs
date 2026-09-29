const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    contactId: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
});

module.exports = mongoose.model("Contact", contactSchema);