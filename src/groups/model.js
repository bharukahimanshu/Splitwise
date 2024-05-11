const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    uuid:{
        type: String
    },
    name: {
        type: String,
        required: true
    },
    members: [{
        _id: false, // Disable automatic generation of ObjectId for each member
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users", // Assuming you have a User model
            required: true
        },
        name : {
            type: String
        }
    }],
    creator:{
        _id: false, // Disable automatic generation of ObjectId for each createdBy
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users", // Assuming you have a User model
            required: true
        },
        name : {
            type: String
        }
    }
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
