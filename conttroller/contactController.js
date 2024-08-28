const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModels");

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});


const createContact = asyncHandler(async (req, res) => {
    console.log("request body: ", req.body);
    const { name, mail, mobile } = req.body;
    if (!name || !mail || !mobile) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const contact = await Contact.create({
        name, mail, mobile, user_id: req.user.id
    });
    res.status(201).json(contact);
})

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorized to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json(updatedContact);
})

const deleteContact = asyncHandler(async (req, res) => {
    console.log("Delete request received for ID:", req.params.id);

    // Find the contact by ID
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        console.log("Contact not found");
        res.status(404);
        throw new Error("Contact not found");
    }

    // Check if the user is authorized to delete this contact
    if (contact.user_id.toString() !== req.user.id) {
        console.log("Unauthorized attempt to delete contact");
        res.status(403);
        throw new Error("Unauthorized to delete this contact");
    }

    // Delete the contact
    await contact.deleteOne();
    console.log("Contact deleted successfully:", contact);
    res.status(200).json(contact);
});


const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
})
// const
module.exports = {
    getAllContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
}