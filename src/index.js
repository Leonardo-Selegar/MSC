require('dotenv').config();
const express = require('express');
const PORT = process.env.APP_PORT;

const employeesController = require('./Controllers/employeesController');

const app = express();

app.use(express.json());

app.get('/employees', employeesController.getAll);
app.post('/employee', employeesController.create);
app.post('/employees', employeesController.createMany);

app.use((error, req, res, next) => {
  if (error.status)  {
    return res.status(error.status).json({ message: error.message});
  }
  res.status(500).json({message: 'internal server error'})
});

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
