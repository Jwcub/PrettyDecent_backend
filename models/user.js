const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email must be a valid email address"]
    },
    password: {
        type: String,
        required: true,
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
userSchema.statics.register = async function (email, password) {
    try {
        const user = new this({ email, password });
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
userSchema.statics.login = async function(email, password) {
    try {
        // Correct email?
        const user = await this.findOne({ email });
        if(!user) {
            throw new Error("Incorrect email or password!")
        }

        // Correct password?
        const isPasswordMatch = await comparePassword(password);
        if(!isPasswordMatch) {
            throw new Error("Incorrect email or password!")
        }

        // Correct credentielas
        return user;
  
    } catch(error) {
        throw error;
    }
};

const User = mongoose.model("User", userSchema);
module.exports = User;