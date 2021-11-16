const db = require('./db/connection');
const express = require('express');
const inquirer = require("inquirer");



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
db.connect(function (err){
    if(err){
        console.log(err);
    }
    //starts application
    startQuestions();
})

// const to start application
const startQuestions = () => {

     inquirer
    .prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Roles",
            "View All Departments",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "View All Roles",
            "Exit"
        ]
    })
    .then(function ({task}) {
        if(task === "View All Employees") {
            viewEmployees();
        } else if (task === "View All Roles") {
            viewRoles(); 
        } else if (task === "View All Departments") {
            viewDepartents();
        } else if (task === "Add Employee"){
            addEmployee();
        } else if (task === "Add Department"){
            addDepartment();
        } else if (task === "Add Role"){
            addRole();
        } else if (task === "Update Employee Role"){
            getEmployees();
        } else if (task === "View All Roles"){
            viewRoles();
        } else {
            console.log("Ended Application");
            return;
        }
    })
};

//view all employees function
const viewEmployees = () => {
    var query = 
    `SELECT * FROM employees`

    db.query(query, function(err, res) {
        if(err){
            console.log(err);
        }
            console.table(res);

            startQuestions();
    })
};

//view all roles function
const viewRoles = () => {
    var query = 
    `SELECT * FROM roles`

    db.query(query, function(err, res) {
        if(err){
            console.log(err);
        }
            console.table(res);

            startQuestions();
    })
}

//view all departments function
const viewDepartents = () => {
    var query = 
    `SELECT * FROM departments`

    db.query(query, function(err, res) {
        if(err){
            console.log(err);
        }
            console.table(res);

            startQuestions();
    })
}

//this prompts to add employees
const addEmployee = () => {

    inquirer
    .prompt([{
        type: "input",
        name: "firstName",
        message: "Enter Employee First Name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "Enter Employee Last Name?"
    },
    {
        type: "input",
        name: "role",
        message: "Enter Employee Role ID"
    },
    {
        type: "input",
        name: "manager",
        message: "Enter Employee Manager ID"
    }
    ])

    .then(function (answer) {
        var query = `INSERT INTO employees SET ?`

        db.query(query, {first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.role,
        manager_id: answer.manager,
        
    }, function(err, res) {
        if(err){
            console.log(err);
        }
            console.table(res);

            startQuestions();
    })
    })

};

//this adds departments
const addDepartment = () => {

    inquirer
    .prompt([{
        type: "input",
        name: "departmentName",
        message: "Enter Department Name?"
    }
    ])

    .then(function (answer) {
        var query = `INSERT INTO departments SET ?`

        db.query(query, {department_name: answer.departmentName
   
    }, function(err, res) {
        if(err){
            console.log(err);
        }
            console.table(res);

            startQuestions();
    })
    })

};

//adds roles
const addRole= () => {

    inquirer
    .prompt([{
        type: "input",
        name: "roleName",
        message: "Enter Role Name?"
    },
    {
        type: "input",
        name: "departmentId",
        message: "Enter Department ID?"
    },
    {
        type: "input",
        name: "salary",
        message: "Enter Salary?"
    }
    ])

    .then(function (answer) {
        var query = `INSERT INTO roles SET ?`

        db.query(query, {title: answer.roleName,
           department_id: answer.departmentId,
           salary: answer.salary 
   
    }, function(err, res) {
        if(err){
            console.log(err);
        }
            console.table(res);

            startQuestions();
    })
    })

};

//this is used to get the employee list
const getEmployees = () => {
    var query = `SELECT id, first_name, last_name FROM employees`

    db.query(query, function(err, res) {
        if(err){
            console.log(err);
        }
        const employees = res.map(({ id, first_name, last_name}) => ({
           value: id, name: `${first_name} ${last_name}`
        }));

        updateRole(employees);
    })

}

//updates employees role
const updateRole = (employees) => {


    inquirer
    .prompt([
        {
            type: "list",
            name: "employeeChoice",
            message: "Which employee would you like to update?",
            choices: employees
        },
        {
            type: "input",
            name: "newRole",
            message: "What role id would you like to give them?"
        }
    ])
    .then(function (answer){
        var query = `UPDATE employees SET role_id = ? where id = ?`

        db.query(query, [answer.newRole, answer.employeeChoice
    
        ], function(err, res) {
         if(err){
             console.log(err);
         }
             console.table(res);
 
             startQuestions();
     })
     })
}
