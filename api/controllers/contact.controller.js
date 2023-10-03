const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = async (req, res) => {
    const {name} = req.body;
    const contact = await Contacts.create({
        name: name
    });
    return res.status(201).json(contact)
};
// Get all contacts
exports.findAll = async (req, res) => {
    try {
    const contacts = await Contacts.findAll();
    contacts.forEach(contact => {
        console.log(contact.dataValues)
    });
    return res.status(200).json(contacts);
    }
    catch(err) {
        console.log(err.message);
    }
};

// Get one contact by id
exports.findOne = async (req, res) => {
    try {
    const findContact = await Contacts.findByPk(req.params.contactId);
    return res.status(200).json(findContact);
    }
    catch(err) {
        console.log(err.message);
    }
};

// Update one contact by id
exports.update = async (req, res) => {
    try {
    const {name} = req.body;
    const findContact = await Contacts.findByPk(req.params.contactId);
    findContact.update({name: name});
    return res.status(200).json(findContact);
    }
    catch(err) {
        console.log(err.message)
    }
};

// Delete one contact by id
exports.delete = async (req, res) => {
    try {
    const findContact = await Contacts.findByPk(req.params.contactId);
    findContact.destroy();
    res.status(200).json("Successfully deleted");
    }
    catch(err) {
        console.log(err.message)
    }
};