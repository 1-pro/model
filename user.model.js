const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// username, password, fname, lname,
const UserSchema = new Schema({
    avatar: { type: String, required: true },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    userType: { type: String, enum: ['admin', 'independentResearcher','staff','student'], default: 'registered' },//admin, registered
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    Bio: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Institution = new Schema({
    name: { type: String},
    type: { type: String, enum: ['polytechnique', 'University','monotechnique','college of education'], required },    name: { type: String, required: true },
    researchHistory: { type: String, required: true },
});
const researchHistory = new Schema({
    type: { type: String, enum: ['chemistry', 'business','management'], required:true},
    name: { type: String, required: true },
    previousResearch: { type: String, enum: ['completed','not completed' ], required:true},
});

UserSchema.pre('save', function (next) {
    let me = this;
    me.fullName = me.fname + ', ' + me.lname;
    const salt = bcrypt.genSaltSync();
    bcrypt.hash(me.password, salt, (err, encrypted) => {
        if (err) {
            console.log("Bcrypt User Model Password encryption Error", err);
            next();
        } else {
            me.password = encrypted;
            next();
        }
    });
});

module.exports = mongoose.model('User', UserSchema);


