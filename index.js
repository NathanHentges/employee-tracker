/* eslint-disable no-use-before-define */

const mysql = require('mysql');
const inquirer = require('inquirer');
// eslint-disable-next-line no-unused-vars
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


const addDepartment = () => { };

const addRole = () => { };

const addEmployee = () => { };

const viewDepartments = () => {
  const query = 'SELECT * FROM department';
  connection.query(query, (err, results) => {
    console.table(results);
    start();
  });
};

const viewRoles = () => {
  const query = 'SELECT r.id, r.title, r.salary, d.name department FROM role r INNER JOIN department d ON r.department_id = d.id;';
  connection.query(query, (err, results) => {
    console.table(results);
    start();
  });
};

const viewEmployees = () => {
  const query = `SELECT 
  e.id,
  e.first_name "first name",
  e.last_name "last name",
  r.title,
  d.name department,
  r.salary,
  CONCAT(m.first_name," ",m.last_name) manager
  
  FROM employee e
  INNER JOIN role r
  ON e.role_id = r.id
  LEFT JOIN employee m
  ON e.manager_id = m.id
  INNER JOIN department d
  ON r.department_id = d.id;`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    start();
  });
};

const updateRoles = () => { };


connection.connect((err) => {
  if (err) throw err;
  start();
});
