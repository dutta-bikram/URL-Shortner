const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortID:{
        type: String,
        required: true,
        unique: true
    },
    redirectURL:{
        type: String,
        required: true
    },
    visitHistory: [{
        timestamp: {
            type: Date,
            default: Date.now,
        }
    }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        index: true,
    }
},
{
    timestamps: true
});

const URLobj = mongoose.model('url', urlSchema);

module.exports = URLobj;