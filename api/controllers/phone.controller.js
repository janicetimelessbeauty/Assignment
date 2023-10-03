const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;
// Create phone
exports.create = async (req, res) => {
    try {
        const {name, number} = req.body;
        const newPhone = await Phones.create({
            name: name,
            number: number,
            contactId: req.params.contactId
        })
        return res.status(201).json(newPhone);
   }
   catch(err) {
        return res.status(400).json("Cannot perform request");
   }
};

// Get all phones
exports.findAll = async (req, res) => {
    try {
        const phones = await Phones.findAll({where : {contactId : {[Op.eq] : req.params.contactId}}});
        return res.status(200).json(phones);
    }
    catch(err) {
        return res.status(400).json("Cannot perform request");
    }
};

// Get one phone by id
exports.findOne = async (req, res) => {
   try {
    const findPhone = await Phones.findOne({where : {id : {[Op.eq] : req.params.phoneId}}});
    return res.status(200).json(findPhone);

   }
   catch(err) {
    return res.status(400).json("Cannot perform request");
   }
};

// Update one phone by id
exports.update = async (req, res) => {
    try {
        const findPhone = await Phones.findOne({where : {id : {[Op.eq] : req.params.phoneId}}});
        const {name, number} = req.body;
        findPhone.update({
            name: name,
            number: number
        });
        return res.status(200).json("Updated successfully")
    }
    catch(err) {
        return res.status(400).json("Cannot perform request")
    }
};
// Delete one phone by id
exports.delete = async (req, res) => {
    try {
        const deletePhone = await Phones.findByPk(req.params.phoneId);
        deletePhone.destroy();
        return res.status(200).json("Deleted successfully")
    }
    catch(err) {
        console.log(err.message)
        return res.status(400).json("Cannot perform request")
    }
};