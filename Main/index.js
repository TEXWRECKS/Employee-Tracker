const connection = require("./connection");
const mysql = require ("mysql");
const inquirer = require("inquirer");
const { restoreDefaultPrompts } = require("inquirer");

connection.connect(function(err) {
  if(err) throw err;
  console.log("connected on port " + port);
  startApp;
});


// SECTION FOR USER PROMPTS

// Beginning prompts
function begin(){
  inquirer.prompt([
    {
      type: "list",
      message: "Welcome to the Employee Management System.  Please choose an option:",
      choices: ["Add Department, Role, Employee", "Update Department, Role, Employee", "View Department, Role, Employee", "Exit EMS"],
      name: "choice"
    }
  ])
  .then(answer => {
    if (answer.choice === "Add Department, Role, Employee"){
      addOption();
    }
    else if (answer.choice === "Update Department, Role, Employee"){
      updateOption();
    }
    else if (answer.choice === "View Department, Role, Employee"){
      viewOption();
    }
    else {
      return console.log("Leaving the Employee Management System");
      connection.end();
    };
  });
};

// Function for prompts if the user selects "Add"
function addOption(){
  inquirer.prompt([
    {
      type: "list",
      message: "Which would you like to add?",
      choices: ["Department", "Role", "Employee"],
      name: "add"
    }
  ])
  .then(answer => {
    if (answer.add === "Department"){
      addDepartment("Department");
    }
    else if (answer.add === "Role"){
      addRole("Role");
    }
    else if (answer.add === "Employee"){
      addEmployee("Employee");
    }
  });
};

// Function for prompts if the user selects "Update"
function updateOption(){
  inquirer.prompt([
    {
      type: "list",
      message: "Which would you like to update?",
      choices: ["Department", "Role", "Employee"],
      name: "update"
    }
  ])
  .then(answer => {
    if (answer.update === "Department"){
      updateDepartment("Department");
    }
    else if (answer.update === "Role"){
      updateRole("Role");
    }
    else if (answer.update === "Employee"){
      updateEmployee("Employee");
    }
  });
};

// Function for prompt if the user selects "View"
function viewOption(){
  inquirer.prompt([
    {
      type: "list",
      message: "Which would you like to view?",
      choices: ["Department", "Role", "Employee"],
      name: "view"
    }
  ])
  .then(answer => {
    if (answer.view === "Department"){
      viewDepartment("Department");
    }
    else if (answer.view === "Role"){
      viewRole("Role");
    }
    else if (answer.view === "Employee"){
      viewEmployee("Employee");
    }
  });
};

// END SECTION FOR USER PROMPTS


// SECTION FOR ADDING DEPARTMENT, ROLE, EMPLOYEE

// Function for adding department
function addDepartment(){
  inquirer.prompt([
    {
      type: "input",
      message: "New Department ID?",
      name: "departmentID"
    },
    {
      type: "input",
      message: "New Department Name?",
      name: "departmentName"
    }
  ])
  .then(answer => {
    const {departmentName, departmentID} = answer
    connection.query("INSERT INTO department SET ?",
    {
      name: answer.departmentName,
      id: answer.departmentID
    },
    function (err, results) {
      if (err) throw err;
      console.table(results);
      console.log(departmentName + " has been successfully added!");
    });
    restart();
  });
};

// Function for adding role
function addRole(){
  inquirer.prompt([
    {
      type: "input",
      message: "New Role ID?",
      name: "roleID"
    },
    {
      type: "input",
      message: "What departmet will the new role belong to?",
      name: "roleDepartment"
    },
    {
      type: "input",
      message: "New Role Title?",
      name: "roleTitle"
    },
    {
      type: "input",
      message: "New Role Salary?",
      name: "roleSalary"
    }
  ])
  .then(answer => {
    const {roleID, roleDepartment, RoleTitle, RoleSalary} = answer
    connection.query("INSERT INTO role SET ?",
    {
      id: answer.roleID,
      department_id: answer.roleDepartment,
      title: answer.roleTitle,
      salary: answer.RoleSalary
    },
    function (err, results) {
      if (err) throw err;
      console.table(results);
      console.log(roleName + " has been successfully added!");
    });
    restart();
  });
};

// Function for adding employee
function addEmployee(){
  inquirer.prompt([
    {
      type: "input",
      message: "What is the employee's id?",
      name: "employeeID"
    },
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "employeeFirstName"
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "employeeLastName"
    },
    {
      type: "input",
      message: "What is the employee role ID?",
      name: "employeeRoleID"
    },
    {
      type: "input",
      message: "What is the employee's manager ID?",
      name: "employeeManagerID"
    }
  ])
  .then(answer => {
    const {employeeFirstName, employeeLastName, employeeRoleID, employeeManagerID} = answer;
    connection.query(
      "INSERT INTO Employee SET ?",
      {
        id: answer.employeeID,
        first_name: answer.employeeFirstName,
        last_name: answer.employeeLastName,
        role_id: answer.employeeRoleID,
        manager_id: answer.employeeManagerID 
      },
      function (err, results){
        if (err) throw err;
        console.table(results);
        console.log(employeeFirstName + " " + employeeLastName + " has been successfully added!")
      });
      restart();
  });
};

// END SECTION FOR ADDING DEPARTMENT, ROLE, EMPLOYEE


// SECTION FOR UPDATING DEPARTMENT, ROLE, EMPLOYEE

// Function for updating department
function updateDepartment (){
  connection.query("SELECT name, FROM department", function (err, result){
    if (err) throw err;
    inquirer.prompt([
      {
        type: "list",
        message: "Which department are you updating?",
        name: "departmentSelection",
        choices: function () {
          const department = [];
            for (let i=0; i < result.length; i++){
              department.push(result[i].name + " " + result[i].id)
            }
            return department;
        },
      },
      {
        type: "input",
        message: "What is the department's new name?",
        name: "newDepartmentName"
      }
    ])
    .then(answer => {
      const departmentName = answer.departmentSelection;
      const newDeptName = answer.newDepartmentName;
      connection.query("UPDATE department SET ? WHERE ?",[
      {
        name: newDeptName
      },
    ],
    function (err, results) {
      if (err) throw err;
      console.table(results);
      console.log("The department name has been successfully updated!");
    });
    });
  });
  restart();
}

// Function for updating role
function updateRole (){
  connection.query("SELECT title, salary, FROM role", function (err, result){
    if (err) throw err;
    inquirer.prompt([
      {
        type: "list",
        message: "Which role are you updating?",
        name: "roleSelection",
        choices: function () {
          const role = [];
            for (let i=0; i < result.length; i++){
              role.push(result[i].title + " " + salary + " " + result[i].id)
            }
            return role;
        },
      },
      {
        type: "input",
        message: "What is the role's new title?",
        name: "newRoleTitle"
      },
      {
        type: "list",
        message: "What is the role's new salary?",
        name: "newRoleSalary"
      }
    ])
    .then(answer => {
      const currentRole = answer.roleSelection;
      const newRole = answer.newroleTitle;
      const roleSalary = answer.newRoleSalary;
      connection.query("UPDATE role SET ? WHERE ?",[
      {
        title: newRole,
        salary: roleSalary
      },
    ],
    function (err, results) {
      if (err) throw err;
      console.table(results);
      console.log("The role has been successfully updated!");
    });
    });
  });
  restart();
};

// Function for updating employee
function updateEmployee(){
  connection.query("SELECT first_name, last_name, role_id, manager_id FROM employee", function (err, result){
    if (err) throw err;
    inquirer.prompt([
      {
        type: "list",
        message: "Which employee are you updating?",
        name: "employeeSelection",
        choices: function () {
          const role = [];
            for (let i=0; i < result.length; i++){
              employee.push(result[i].first_name + " " + last_name + " " + role_id + " " + manager_id + result[i].id)
            }
            return employee;
        },
      },
      {
        type: "input",
        message: "What is the employee's new first name?",
        name: "newFirstName"
      },
      {
        type: "input",
        message: "What is the employee's new last name?",
        name: "newLastName"
      },
      {
        type: "input",
        message: "What is the employee's new role ID?",
        name: "newEmployeeRoleID"
      },
      {
        type: "input",
        message: "What  is the employee's new manager ID?",
        name: "newEmployeeManagerID"
      }
    ])
    .then(answer => {
      const employeeName = answer.employeeSelection;
      const employeeFirstName = answer.newFirstName;
      const employeeLastName = answer.newLastName;
      const employeeRoleID = answer.newEmployeeRoleID;
      const employeeManagerID = answer.newEmployeeManagerID;
      connection.query("UPDATE employee SET ? WHERE ?",[
        {
          first_name: employeeFirstName,
          last_name: employeeLastName,
          role_id: employeeRoleID,
          manager_id: employeeManagerID
        },
      ],
      function (err, results) {
        if (err) throw err;
        console.table(results);
        console.log("The employee has been successfully updated!");
      });
      });
    });
  restart();
};

// END SECTION FOR UPDATING DEPARTMENT, ROLE, EMPLOYEE


// SECTION FOR VIEWING DEPARTMENT, ROLE, EMPLOYEE

// Function for viewing the department
function viewDepartment(){
  connection.query("SELECT * FROM department", function(err, results){
    if (err) throw err;
    console.table(results);
  });
  restart();
};

// Function for viewing the role
function viewRole(){
  connnection.query("SELECT * FROM role", function(err, results){
    if (err) throw err;
    console.table(results);
  });
  restart();
};

// Function for viewing the employee
function viewEmployee(){
  connection.query("SELECT * FROM employee", function(err, results){
    if (err) throw err;
    console.table(results);
  });
  restart();
};

// END SECTION FOR VIEWING DEPARTMENT, ROLE, EMPLOYEE


// SECTION FOR RESTART
function restart(){
  inquirer.prompt([
    {
      type: "list",
      message: "Do you want to add more, or return to the main menu?",
      choices: ["Add", "Update", "View", "Return to main menu"],
      name: "restartOption"
    }
  ])
  .then(answer => {
    if (answer.restartOption === "Add"){
      addOption();
    }
      else if (answer.restartOption === "Update"){
        updateOption();
      }
      else if (answer.restartOption === "View"){
        viewOption();
      }
      else {
        begin()
      };
    });
};
// END RESTART SECTION