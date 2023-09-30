const mongoose = require('mongoose');

const indexSchema = mongoose.Schema({
    email: String,
    pass: String,
    firstName: String,
    lastName: String,
    gender: String,
    dob: Date,
    desc: String,
    address: String,
    number: Number,
    role: { type: String, default: 'Public' },
    img: { type: String, default: 'default.png' },
    createDate: { type: Date, default: new Date() },
    status: { type: String, default: 'suspended' }
})



module.exports = mongoose.model('reg', indexSchema)