
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