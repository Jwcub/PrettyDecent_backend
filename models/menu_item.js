const mongoose = require("mongoose");

// Menu item schema
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ["food", "drink"]
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        required: true,

    },
    bottle_price: {
        type: Number
    },
    origin: {
        type: String,
        trim: true
    },
    display: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Menu_item = mongoose.model("Menu_item", menuSchema);
module.exports = Menu_item; 