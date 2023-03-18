const Joi = require('joi')
const employeesModel = require('../Models/employeesModel');
const officesModel = require('../Models/officesModel');

const employeeSchema = Joi.object({
  firstName: Joi.string().min(2).max(45).required(),
  lastName: Joi.string().min(2).max(45).required(),
  office: Joi.number().min(1).required(),
})

const getAll = async () => {
  const employees = await employeesModel.getAll();
  return employees;
};

const create = async ({ firstName, lastName, office }) => {
  const { error } = employeeSchema.validate({ firstName, lastName, office });
  if (error) throw { status: 400, message: error.message };

  const findOffice = await officesModel.getById(office);
  if (!findOffice) throw { status: 400, message: '"office" must be valid'}

  const id = await employeesModel.create({ firstName, lastName, office });
 
  return { firstName, lastName, office, id };
};

module.exports = {
  getAll,
  create,
}
