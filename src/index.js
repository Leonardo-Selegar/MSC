require('dotenv').config();
const express = require('express');
const PORT = process.env.APP_PORT;

const employeesController = require('./Controllers/employeesController');

const app = express();

app.use(express.json());

app.get('/employees', employeesController.getAll);

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
