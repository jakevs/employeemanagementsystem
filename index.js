const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

// Display logo text, load main prompts
async function init() {
  const logoText = await logo({ name: "Employee Manager" }).render();

  console.log(logoText);

  await loadMainPrompts();
  console.log(">>> HERE");
}

async function loadMainPrompts() {
  const choices = [
    {
      name: "View All Employees",
      value: "VIEW_EMPLOYEES"
    },
    {
      name: "View All Employees By Department",
      value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
    },
    {
      name: "View All Employees By Manager",
      value: "VIEW_EMPLOYEES_BY_MANAGER"
    },
    {
      name: "Add Employee",
      value: "ADD_EMPLOYEE"
    },
    {
      name: "Remove Employee",
      value: "REMOVE_EMPLOYEE"
    },
    {
      name: "Update Employee Role",
      value: "UPDATE_EMPLOYEE_ROLE"
    },
    {
      name: "Update Employee Manager",
      value: "UPDATE_EMPLOYEE_MANAGER"
    },
    {
      name: "View All Roles",
      value: "VIEW_ROLES"
    },
    {
      name: "Add Role",
      value: "ADD_ROLE"
    },
    {
      name: "Remove Role",
      value: "REMOVE_ROLE"
    },
    {
      name: "View All Departments",
      value: "VIEW_DEPARTMENTS"
    },
    {
      name: "Add Department",
      value: "ADD_DEPARTMENT"
    },
    {
      name: "Remove Department",
      value: "REMOVE_DEPARTMENT"
    },
    {
      name: "Quit",
      value: "QUIT"
    }
  ];
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices
    }
  ]);

  console.log(choice);
  // Call the appropriate function depending on what the user chose

  switch (choice.choice) {
    case "VIEW_EMPLOYEES":
      viewEmployees();
      break;
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
      viewEmployeesByDepartment();
      break;
    case "VIEW_EMPLOYEES_BY_MANAGER":
      viewEmployeesByManager();
      break;
    case "ADD_EMPLOYEE":
      addEmployee();
      break;
    case "REMOVE_EMPLOYEE":
      removeEmployee();
      break;
    case "UPDATE_EMPLOYEE_ROLE":
      updateEmployeeRole();
      break;
    case "UPDATE_EMPLOYEE_MANAGER":
      updateEmployeeManager();
      break;
    case "VIEW_DEPARTMENTS":
      viewDepartments();
      break;
    case "ADD_DEPARTMENT":
      addDepartment();
      break;
    case "REMOVE_DEPARTMENT":
      removeDepartment();
      break;
    case "VIEW_ROLES":
      viewRoles();
      break;
    case "ADD_ROLE":
      addRole();
      break;
    case "REMOVE_ROLE":
      removeRole();
      break;
    default:
      quit();
  }
}

async function viewEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);

  await loadMainPrompts();
}

async function viewEmployeesByDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Which department would you like to see employees for?",
      choices: departmentChoices
    }
  ]);

  const employees = await db.findAllEmployeesByDepartment(departmentId);

  console.log("\n");
  console.table(employees);

  loadMainPrompts();
}

async function viewEmployeesByManager() {
  const managers = await db.findAllEmployees();

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Which employee do you want to see direct reports for?",
      choices: managerChoices
    }
  ]);

  const employees = await db.findAllEmployeesByManager(managerId);

  console.log("\n");

  if (employees.length === 0) {
    console.log("The selected employee has no direct reports");
  } else {
    console.table(employees);
  }

  loadMainPrompts();
}

async function removeEmployee() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to remove?",
      choices: employeeChoices
    }
  ]);

  await db.removeEmployee(employeeId);

  console.log("Removed employee from the database");

  loadMainPrompts();
}

async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices
    }
  ]);

  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "Which role do you want to assign the selected employee?",
      choices: roleChoices
    }
  ]);

  await db.updateEmployeeRole(employeeId, roleId);

  console.log("Updated employee's role");

  loadMainPrompts();
}

async function updateEmployeeManager() {
  const employees = await db.findAllEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's manager do you want to update?",
      choices: employeeChoices
    }
  ]);

  const managers = await db.findAllPossibleManagers(employeeId);

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message:
        "Which employee do you want to set as manager for the selected employee?",
      choices: managerChoices
    }
  ]);

  await db.updateEmployeeManager(employeeId, managerId);

  console.log("Updated employee's manager");

  loadMainPrompts();
}

async function viewRoles() {
  const roles = await db.findAllRoles();

  console.log("\n");
  console.table(roles);

  loadMainPrompts();
}

async function addRole() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?"
    },
    {
      name: "salary",
      message: "What is the salary of the role?"
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: departmentChoices
    }
  ]);

  await db.createRole(role);

  console.log(`Added ${role.title} to the database`);

  loadMainPrompts();
}

async function removeRole() {
  const roles = await db.findAllRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message:
        "Which role do you want to remove? (Warning: This will also remove employees)",
      choices: roleChoices
    }
  ]);

  await db.removeRole(roleId);

  console.log("Removed role from the database");

  loadMainPrompts();
}

async function viewDepartments() {
  const departments = await db.findAllDepartments();

  console.log("\n");
  console.table(departments);

  loadMainPrompts();
}

async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ]);

  await db.createDepartment(department);

  console.log(`Added ${department.name} to the database`);

  loadMainPrompts();
}

async function removeDepartment() {
  const departments = await db.findAllDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt({
    type: "list",
    name: "departmentId",
    message:
      "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
    choices: departmentChoices
  });

  await db.removeDepartment(departmentId);

  console.log(`Removed department from the database`);

  loadMainPrompts();
}

async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices
  });

  employee.manager_id = managerId;

  await db.createEmployee(employee);

  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );

  loadMainPrompts();
}

async function quit() {
  console.log("Goodbye!");
  process.exit();
}

(async function () {
  await init();
})();
