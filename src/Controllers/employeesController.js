const employeesService = require('../Services/employeesService');

const getAll = async (req, res) => {
  const employees = await employeesService.getAll();
  res.status(200).json(employees);
};

module.exports = {
  getAll,
}