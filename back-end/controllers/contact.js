/*
 * Contact controller
 */

/* Import contact model */
const Contact = require('../models/Contact');

const contactController = {

    getAllContacts: (req, res) => {
        Contact.find({}, (err, data) => {
            if(err) {
                res.status(500).json({message: "Une erreur s'est produite"});
                return;
            }

            res.json(data);
        });
    },

    
    createContact: (req, res) => {
        const newContactData = req.body.contactData;

        if(!newContactData.lastname || !newContactData.firstname) {
            res.status(400).json({message: "Un contact doit avoir au minimum un nom et un prénom."});
            return;
        }

        let newContact = new Contact({
            lastname: newContactData.lastname,
            firstname: newContactData.firstname,
            email: newContactData.email,
            phone: newContactData.phone
        });

        newContact.save((err) => {
            if(err) {
                res.status(500).json({message: "Une erreur s'est produite"});
                return;
            }

            res.json({message: "Contact enregistré"});
        });
    }
    
}

module.exports = contactController;