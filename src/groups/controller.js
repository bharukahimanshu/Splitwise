const groups = require('./model');
const { v4: uuidv4 } = require('uuid');
const users = require('../auth/model')

async function createGroup(req, res){
    try {
        const groupName = req.body.name;
        

        const newGroup = {
            name: groupName,
            creator: {
                id: req.user._id,
                name: req.user.name
            },
            members: {
                id: req.user._id,
                name: req.user.name
            }
        }

        // Assuming model.createGroup creates and saves the group in the database
        await groups.create(newGroup);

        return res.status(200).json({ 'message': "Group created successfully"});
    } catch (error) {
        console.error("Error creating group:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
async function joinGroup(req, res){
    try {
        const groupId = req.body.groupId;
        const userId = req.user._id;

        // Find the group by UUID
        const group = await groups.findById({ groupId });

        if (group) {
            // Ensure that the members array exists
            if (!group.members) {
                group.members = []; // Initialize the members array if it doesn't exist
            }

            // Create a new member object
            const newMember = {
                id: userId,
                name: req.user.name
            };

            // Push the new member to the members array
            group.members.push(newMember);

            // Save the updated group document
            await group.save();

            return res.status(200).json({ message: "Joined group successfully" });
        } else {
            return res.status(404).json({ error: "Group not found" });
        }
    } catch (error) {
        console.error("Error adding member to group:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = { createGroup, joinGroup };
