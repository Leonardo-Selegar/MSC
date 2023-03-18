const { connection } = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM exercises.employees';
  const [employees] = await connection.execute(query);
  return employees;
}

module.exports = {
  getAll,
}