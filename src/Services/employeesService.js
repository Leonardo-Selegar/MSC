const employeesModel = require('../Models/employeesModel');
const officesModel = require('../Models/officesModel');
const { employeeSchema, idSchema, employeesArraySchema } = require('./authentication/schemas')

const getAll = async () => {
  const employees = await employeesModel.getAll();
  return employees;
};

const getById = async (id) => {
  const { error } = idSchema.validate({id});
  if (error) throw { status: 400, message: error.message };

  const employee = await employeesModel.getById(id);

  if (!employee) throw { status: 404, message: '"employee" not found'};
  return employee;
};

const create = async ({ firstName, lastName, office }) => {
  const { error } = employeeSchema.validate({ firstName, lastName, office });
  if (error) throw { status: 400, message: error.message };

  const findOffice = await officesModel.getById(office);
  if (!findOffice) throw { status: 400, message: '"office" must be valid'}

  const id = await employeesModel.create({ firstName, lastName, office });
 
  return { firstName, lastName, office, id };
};

const createMany = async (employeesArray) => {
  const { error } = employeesArraySchema.validate(employeesArray);

  if (error) throw { status: 400, message: error.message };

  const newEmployeesPromises = employeesArray.map((employee) => employeesModel.create(employee));
  const newEmployeesResolvePromises = await Promise.all(newEmployeesPromises); // espera a solução de cada item do array

  const newEmployees = employeesArray.map((employee, index) => ({id: newEmployeesResolvePromises[index], ...employee })); 
  return newEmployees.sort((a, b) => a.id - b.id); // ordena o retorno
};

module.exports = {
  getAll,
  getById,
  create,
  createMany,
}
