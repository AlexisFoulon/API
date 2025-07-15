const mongoose =require ('mongoose');
const bcrypt = require ('bcrypt');

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type : String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+@.+\../, "Email invalide"]
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
});

//hacher le MDP
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// Verification du MDP 
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema)