const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
    try {
        const contact = new Contact(req.body);
        const savedContact = await contact.save();

        res.status(201).json({
            message: "Contact created successfully",
            contact: savedContact
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create contact",
            error: error.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find();

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch contacts",
            error: error.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const contact = await Contact.findOne({
            contactId: req.params.id
        });

        if (!contact) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch contact",
            error: error.message
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const contact = await Contact.findOneAndUpdate(
            { contactId: req.params.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!contact) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        res.status(200).json({
            message: "Contact updated successfully",
            contact: contact
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update contact",
            error: error.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({
            contactId: req.params.id
        });

        if (!contact) {
            return res.status(404).json({
                message: "Contact not found"
            });
        }

        res.status(200).json({
            message: "Contact deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete contact",
            error: error.message
        });
    }
});

module.exports = router;