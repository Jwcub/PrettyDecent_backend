const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Hash password
userSchema.pre("save", async function() {
    try {
        if(this.isNew || this.isModified("password")) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
    } catch(error) {
        throw error;
    }
});

// Register User
userSchema.statics.register = async function (username, password, email) {
    try {
        const user = new this({ username, password, email });
        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
};

//Compare hashed password
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch(error) {
        throw error;
    }
};

// Login User
userSchema.statics.login = async function(username, password, email) {
    try {
        // Correct username?
        const user = await this.findOne({ username });
        if(!user) {
            throw new Error("Incorrect username or password!")
        }

        // Correct password?
        const isPasswordMatch = await comparePassword(password);
        if(!isPasswordMatch) {
            throw new Error("Incorrect username or password!")
        }

        // Correct credentielas
        return user;
  
    } catch(error) {
        throw error;
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;