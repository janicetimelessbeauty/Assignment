const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Op = db.Sequelize.Op;

// Calculate stats
exports.calculate = async (req, res) => {
    try {
    const numContacts = await Contacts.findOne({attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('id')), "numContacts"]]});
    const numPhones = await Phones.findOne({attributes: [[db.sequelize.fn('COUNT', db.sequelize.col('id')), "numPhones"]]});
    const earliest = await Contacts.findOne({attributes: [[db.sequelize.fn('MIN', db.sequelize.col('createdAt')), 'earlyDate']]});
    const latest = await Contacts.findOne({attributes: [[db.sequelize.fn('MAX', db.sequelize.col('createdAt')), 'latestContact']]});
    const cal = {
        numContacts,
        numPhones,
        earliest,
        latest,
    };
    return res.status(200).json(cal);
    }
    catch(err) {
        return res.status(400).json("Stat error");
    }
};