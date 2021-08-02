const inquirer = require('inquirer');
const util = require('util');
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
    async addRole() {
        const query = util.promisify(this.db.query).bind(this.db);
        const querySql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        const sqlArr = await query(`SELECT COUNT(department_id) AS departmentCount FROM departments`);
        const { departmentCount } = sqlArr[0];

        const countArr = [];
        for(let i = 1; i <= departmentCount; i++){
            countArr.push(i);
        }

        const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of the role you want to add?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is the salary of the role you want to add?',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'What is the department ID of the role you want to add?',
            name: 'department_id',
            choices: countArr
        }
    ]);

    await query(querySql, [title, salary, department_id]).catch(err => {throw new Error(err)});

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