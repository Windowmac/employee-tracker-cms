const util = require('util');
const inquirer = require('inquirer');

class Departments {
  constructor(database) {
    this.db = database;
  }

  viewAllDepartments() {
    const sql = `SELECT * FROM departments`;

    this.db.query(sql, (err, results) => {
      if (err) {
        throw new Error(err);
      } else {
        console.table(results);
      }
    });
  }

  async addDepartment() {
    const query = util.promisify(this.db.query).bind(this.db);
    const sql = `INSERT INTO departments (name) VALUES (?)`;
    const { department } = await inquirer.prompt([
      {
        type: 'input',
        message: 'What is the name of the department you want to add?',
        name: 'department',
      },
    ]);
    const { insertId } = await query(sql, department).catch((err) => {
      throw new Error(err);
    });
    console.log(`successfully logged department #${insertId}`);
  }
}

module.exports = Departments;
