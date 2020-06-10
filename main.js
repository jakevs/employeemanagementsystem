const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

async function init() {
  const logoText = await logo({ name: "Employee Management System" }).render();

  console.log(logoText);

  await questions();
}
function questions() {
  const prompts = false;
  inquirer.prompt({
    type: "list",
    name: "actions",
    message: "What would you like to select first?",
    choices: [
      "View All Employees",
      "View All Roles",
      "View All Departments",
      "Goodbye"
    ]
  });
  // const { again, ...answers } = await inquirer.prompt(prompts);
  // const newInputs = [...inputs, answers];
  // return again ? questions(newInputs) : newInputs;
}

init();
