const util = require('util');
const inquirer = require('inquirer');

class Roles {
  constructor(database) {
    this.db = database;
  }

  viewAllRoles() {
    const sql = `SELECT * FROM roles`;

    this.db.query(sql, (err, results) => {
      if (err) {
        throw new Error(err);
      } else {
        console.table(results);
      }
    });
  }

  async addRole() {
    const query = util.promisify(this.db.query).bind(this.db);
    const querySql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
    const sqlArr = await query(
      `SELECT COUNT(department_id) AS departmentCount FROM departments`
    );
    const { departmentCount } = sqlArr[0];

    const countArr = [];
    for (let i = 1; i <= departmentCount; i++) {
      countArr.push(i);
    }

    const { title, salary, department_id } = await inquirer.prompt([
      {
        type: 'input',
        message: 'What is the title of the role you want to add?',
        name: 'title',
      },
      {
        type: 'input',
        message: 'What is the salary of the role you want to add?',
        name: 'salary',
      },
      {
        type: 'list',
        message: 'What is the department ID of the role you want to add?',
        name: 'department_id',
        choices: countArr,
      },
    ]);

    const { insertId } = await query(querySql, [
      title,
      salary,
      department_id,
    ]).catch((err) => {
      throw new Error(err);
    });
    console.log('successfully added role ID #' + insertId);
  }
}

module.exports = Roles;
