const express = require('express')
const app = express();
const router = require('express').Router();
const { getContacts, getContact, createContact, updateContact, deleteContact, getContactsByFiltering } = require('../controllers/contactController')
const authHandler = require('../middleWare/authHandler');
const { createContactValidator } = require('../validators/contactValidator')
const roleHandler = require('../middleWare/roleHandler')

router.use(authHandler)

router.route('/contacts').get(roleHandler('admin', 'user'), getContacts)

router.get('/contactsByFilter',roleHandler('admin'), getContactsByFiltering)

router.get('/contacts/:id', getContact)

router.post('/contacts', createContactValidator, createContact)

router.put('/contacts/:id', updateContact)
router.delete('/contacts/:id', deleteContact)



module.exports = router