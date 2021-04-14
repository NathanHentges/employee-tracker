
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'thisISmySQL',
  database: 'employeeTracker_DB',
});

const start = () => {
  inquirer.prompt({
    name: 'doNext',
    type: 'list',
    message: 'What would you like to do next?',
    choices: ['Add department', 'Add role', 'Add employee',
      'View departments', 'View roles', 'View employees', 'Update employee roles']
  })
    .then((answer) => {
      switch (answer.doNext) {
        case 'Add department':
          addDepartment();
          break;

        case 'Add role':
          addRole();
          break;

        case 'Add employee':
          addEmployee();
          break;

        case 'View departments':
          viewDepartments();
          break;

        case 'View roles':
          viewRoles();
          break;

        case 'View employees':
          viewEmployees();
          break;

        case 'Update employee roles':
          updateRoles();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          connection.end();
          break;
      }
    });
};


const addDepartment = () => {};

const addRole = () => {};

const addEmployee = () => {};

const viewDepartments = () => {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, results) => {
    console.table(results);
    start();
  });
};

const viewRoles = () => {};

const viewEmployees = () => {};

const updateRoles = () => {};


connection.connect((err) => {
  if (err) throw err;
  start();
});
