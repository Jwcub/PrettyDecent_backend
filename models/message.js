const mongoose = require("mongoose");

// Messages schema
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        min: [10]
    },
    status: {
        type: String,
        enum: ["new", "pending", "answered"],
        default: "new"
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message; 