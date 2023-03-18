const Joi = require('joi');

const idSchema = Joi.object({
  id: Joi.number().min(1).required(),
}).messages({
  'number.empty': '{{#label}} must not be empty'
})

const employeeSchema = Joi.object({
  firstName: Joi.string().min(2).max(45).required().label('firstName'),
  lastName: Joi.string().min(2).max(45).required().label('lastName'),
  office: Joi.number().min(1).required().label('office'),
}).messages({
  'any.required': '{{#label}} is required',
  'string.min': '{{#label}} must be at least {{#limit}} characters long',
  'string.max': '{{#label}} must have a max of {{#limit}} characters long',
  'string.empty': '{{#label}} must not be empty',
});

const employeesArraySchema = Joi.array().items(employeeSchema);

module.exports = {
  idSchema,
  employeeSchema,
  employeesArraySchema,
};
