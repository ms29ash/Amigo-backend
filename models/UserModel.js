const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: true,
        default: "https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg"
    }

})

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
});

userSchema.methods.comparePass = async function (enterPass) {

    return await bcrypt.compare(enterPass, this.password);
};



const User = mongoose.model('User', userSchema);
module.exports = User; 