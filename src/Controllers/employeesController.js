const employeesService = require('../Services/employeesService');

const getAll = async (req, res) => {
  const employees = await employeesService.getAll();
  res.status(200).json(employees);
};

const create = async (req, res, next) => {
  try {
    const { firstName, lastName, office } = req.body
    const newEmployee = await employeesService.create({ firstName, lastName, office });
    res.status(201).json(newEmployee)
  } catch (error) {
    next(error)
  }
}

const createMany = async (req, res, next) => {
  try {
    const employees = req.body;
    const newEmployees = await employeesService.createMany(employees);
    res.status(201).json(newEmployees);
  } catch (error){
    next(error);
  }
}

module.exports = {
  getAll,
  create,
  createMany,
}