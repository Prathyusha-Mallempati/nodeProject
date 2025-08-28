const Contact = require('../models/contactModel');
const { getContactsByFilter } = require('../services/contactService')


//@Get  GET get all contacts
// api/v1/contacts
//Private route
const getContacts = async (req, res, next) => {
    const contactsList = await Contact.find({ user_id: req.user.id });
    //In this usre_id is using User model as ref. to fecth user Data populate is used
    const article = await Contact.find({ user_id: req.user.id }).populate("user_id");
    console.log('9', article);

    console.log('Get call')
    res.json(contactsList)
}


// Need to use the above call only. but for learning purpose 
// Using this one with services, utils by seperating the logic
const getContactsByFiltering = async (req, res, next) => {
    try {
        // For small logics no need to use the services but for best practises
        //  and as code grows long need to use the services for logic handling
        console.log('25',req.params)
        const contactsList = await getContactsByFilter(req.query)
        res.json(contactsList)
    } catch (error) {
        next(error)
    }
}

//@Get  GET single contact
// api/v1/contacts/:id
//Private route
const getContact = async (req, res, next) => {
    const contact = await Contact.findById(req.params.id)
    console.log('Get call for single user')
    if (!contact) {
        const error = new Error('Not found')
        res.status(404);
        next(error)
    }
    if (contact.user_id.toString() !== req.user.id) {
        const error = new Error("User don't have access to update the contact")
        res.status(403);
        next(error)
    }
    res.json(contact)
}

//@Get  POST single contact
// api/v1/contacts
//Private route
const createContact = async (req, res, next) => {
    console.log('Create contact')
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        const error = new Error('All are required fields')
        res.status(400);
        next(error)
    }
    const createdContact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(createdContact)
}

//@Get  PUT single contact
// api/v1/contacts/:id
//Private route
const updateContact = async (req, res, next) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        const error = new Error('Not found')
        res.status(404);
        next(error)
    }
    if (contact.user_id.toString() !== req.user.id) {
        const error = new Error("User don't have access to update the contact")
        res.status(403);
        next(error)
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,

        req.body,

        { new: true }
    )
    console.log('update single user')
    res.json(updatedContact)
}

//@Get  GET single contact
// api/v1/contacts/:id
//Private route
const deleteContact = async (req, res, next) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        const error = new Error('Not found')
        res.status(404);
        next(error)
    }
    if (contact.user_id.toString() !== req.user.id) {
        const error = new Error("User don't have access to update the contact")
        res.status(403);
        next(error)
    }
    await Contact.findByIdAndDelete(req.params.id)

    console.log('Delete contact')
    res.json(contact)
}

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact, getContactsByFiltering }


//mongodb+srv://prathyushachowdary24:<db_password>@prathyushacluster.zuavzff.mongodb.net/?retryWrites=true&w=majority&appName=PrathyushaCluster