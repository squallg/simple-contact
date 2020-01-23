/* Modules imports */
var express = require('express');
var router = express.Router();

/* Contacts controller */
const contactController = require('../controllers/contact');

/* GET contacts */
router.get('/all', (req, res) => {
    contactController.getAllContacts(req, res);
});

/* POST create contact */
router.post('/create', (req, res) => {
    contactController.createContact(req, res);
});

module.exports = router;