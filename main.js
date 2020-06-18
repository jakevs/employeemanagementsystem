const util = require("util");
const mysql = require("mysql");
const inquirer = require("inquirer");
// const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
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

questions();


function questions() {
  inquirer
  .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit"
      ]

  }).then((response) => {
      switch (response.action) {
          case "View All Departments":
              viewAllDepartments();
              break;
          case "View All Roles":
              viewAllRoles();
              break;
          case "View All Employees":
              viewAllEmployees();
              break;
          case "Add Department":
              addDepartment();
              break;
          case "Add Role":
              addRole();
              break;
          case "Add Employee":
              addEmployee();
              break;
          case "Update Employee Role":
              updateEmployeeRole();
              break;
          default :
              exitApp();
              break;
      }
  })
}

function exitApp() {
console.log("Ending Program!");
process.exit();
}
// module.exports = connection;
