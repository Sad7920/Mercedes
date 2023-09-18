const mongoose = require('mongoose');
const { Schema } = mongoose;

const userRegisterSchema = new Schema({
    companyId: Number,
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
}, { timestamps: true });


const UserModel = mongoose.model('userregisters', userRegisterSchema);

module.exports = { UserModel };





