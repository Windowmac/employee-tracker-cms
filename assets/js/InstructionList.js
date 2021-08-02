const inquirer = require('inquirer');

class InstructionList {
    constructor(database) {
        this.db = database;
    }

    viewAllDepartments() {
        const sql = `SELECT * FROM departments`;

        this.db.query(sql, (err, results) => {
            if(err){
                throw new Error(err);
            } else {
                console.log(results);
            }
        });
    } 
    viewAllRoles() {
        const sql = `SELECT * FROM roles`;

        this.db.query(sql, (err, results) => {
            if(err){
                throw new Error(err);
            } else {
                console.log(results);
            }
        });
    } 
    viewAllEmployees() {
        const sql = `SELECT * FROM employees`;

        this.db.query(sql, (err, results) => {
            if(err){
                throw new Error(err);
            } else {
                console.log(results);
            }
        });
    } 
    async addDepartment() {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const { department } = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department you want to add?',
            name: 'department'
        }]);
        this.db.query(sql, department, (err, results) => {
            if(err) {
                throw new Error(err);
            } else {
                console.log(`successfully added ${department} to the database`);
            }
        });
    }
    addRole() {

    }
    addEmployee() {

    }
    updateEmployeeRole() {

    }
    exit() {
        console.log('goodbye!');
        process.exit(this);
    }
}

module.exports = InstructionList;