const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        fullName: { type:String, required: true},
        email: { type:String, required: true, unique: true},
        password: { type:String, required: true },
        profileImageUrl: { type:String, default: null},
    },
    {timestamps: true}
);

// Hash password before saving. In Mongoose 7, async middleware should not
// use the `next` callback, so we return a promise instead.
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

//Compare Passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);