const joi = require("joi");

const createContactSchema = joi.object({
    name: joi.string().required().min(3).max(50).messages({
        'string.base': "Name should be a type of text",
        'string.empty': 'Name is required',
        'string.min': `Name should have at laest {#limit} characters`,
        'string.max': `Name should have at most {#limim} characters`,
        'any.required': `Name is a required field`
    }),
    user_id: joi.string().required(),
    email: joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'Email should be a type of text',
            'string.email': 'Please provide a valid email address',
            'string.empty': 'Email is required',
            'any.required': 'Email is a required field'
        }),
    phone: joi.string().required()
        .pattern(/^[0-9]{10}$/)
        .messages({
            'string.pattern.base': 'Phone number must be exactly 10 digits',
            'any.required': 'phone is a required field',
            'string.empty': 'phone is required',
        })
})

// const updateContactSchema = Joi.object({
//     name: Joi.string().min(3).max(50),
//     email: Joi.string().email()
// });


const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next();
};

module.exports = {
    createContactValidator: validate(createContactSchema),
    // updateContactValidator: validate(updateContactSchema)
};