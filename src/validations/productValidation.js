const Joi = require('joi');

exports.productSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().min(0),
    category: Joi.string().required(),
    image: Joi.string()
});