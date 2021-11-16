const db = require('./db/connection');
const express = require('express');
const inquirer = require("inquirer");
const { DH_CHECK_P_NOT_PRIME } = require('constants');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


db.connect(function (err){
    if(err){
        console.log(err);
    }
    startQuestions();
})

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
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
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
        } else if (task === "Update Employee Role"){
            updateEmployeeRole();
        } else if (task === "Update Employee Manager"){
            updateEmployeeManager();
        } else if (task === "View All Roles"){
            viewRoles();
        } else {
            console.log("Ended Application");
            return;
        }
    })
};


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