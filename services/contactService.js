const Contact = require('../models/contactModel')
const { buildQuery } = require("../utils/queryBuilder")


const getContactsByFilter = async (queryParams) => {
   
    const { filter, options } = buildQuery(queryParams);
    const contacts = await Contact.find(filter, null, options);
    const totalCount = await Contact.countDocuments(filter);
    return {
        contacts, 
        totalCount, 
        page: parseInt(queryParams.page) || 1,
        limit: parseInt(queryParams.limit) || 10
    }

}

module.exports = { getContactsByFilter }