const util = require("util");
const mysql = require("mysql");
const inquirer = require("inquirer");
// const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "employees"
});

connection.connect();

// Setting up connection.query to use promises instead of callbacks
// This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);
// async function init() {
//   const logoText = await logo({ name: "Employee Management System" }).render();

//   console.log(logoText);
// init();

// }
function questions() {
  const prompts = false;
  inquirer
    .prompt({
      type: "list",
      name: "actions",
      message: "What would you like to select first?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Goodbye"
      ]
    })
    .then(function (selection) {
      switch (selection.actions) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Goodbye":
          break;
        default:
          break;
      }
    });
}
// const { again, ...answers } = await inquirer.prompt(prompts);
// const newInputs = [...inputs, answers];
// return again ? questions(newInputs) : newInputs;

function viewAllEmployees() {
  const employees =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;";

  console.table(employees);
}
function viewAllRoles() {
  const roles =
    "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;";

  console.table(roles);
}
function viewAllDepartments() {
  const departments =
    "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;";

  console.table(departments);
}
questions();
