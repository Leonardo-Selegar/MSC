const employeesModel = require('../Models/employeesModel');

const getAll = async () => {
  const employees = await employeesModel.getAll();
  return employees;
};

module.exports = {
  getAll,
}
