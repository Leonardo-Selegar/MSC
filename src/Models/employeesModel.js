const { connection } = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM exercises.employees';
  const [employees] = await connection.execute(query);
  return employees;
}

const getById = async (id) => {
  const query = 'SELECT * FROM exercises.employees WHERE id = ?';
  const [[employees]] = await connection.execute(query, [id]);
  return employees;
}

const create = async ({ firstName, lastName, office }) => {
  const query = 'INSERT INTO exercises.employees(first_name, last_name, office) VALUES(?, ?, ?)';
  const [newEmployee] = await connection.execute(query, [firstName, lastName, office]); //usando as '?' previne ataques de sql injection
  return newEmployee.insertId;
}

module.exports = {
  getAll,
  getById,
  create,
}