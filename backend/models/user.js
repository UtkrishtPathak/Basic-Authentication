const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        }
    },
    {
        collection: 'users'
    }
)

module.exports = mongoose.model('UserData', User);