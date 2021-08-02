const inquirer = require('inquirer');
const util = require('util');

class InstructionList {
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

  viewAllEmployees() {
    const sql = `SELECT * FROM employees`;

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
    const { insertId } = await query(sql, department).catch(err => {throw new Error(err)});
    console.log(`successfully logged department #${insertId}`);
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

  async addEmployee() {
    const query = util.promisify(this.db.query).bind(this.db);
    const querySql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

    const rolesArr = await query(`SELECT title FROM roles`).catch((err) => {
      throw new Error(err);
    });

    const employeeSqlArr = await query(
      `SELECT employee_id, last_name, manager_id FROM employees JOIN roles ON employees.role_id = roles.role_id`
    ).catch((err) => {
      throw new Error(err);
    });

    const idMaxArr = await query(
      `SELECT MAX(employee_id) AS idMax FROM employees`
    ).catch((err) => {
      throw new Error(err);
    });
    const { idMax } = idMaxArr[0];

    const managersArr = [];
    const roleTitles = [];
    employeeSqlArr.forEach((obj) => {
      if (obj.employee_id === obj.manager_id) {
        managersArr.push({ 'last name': obj.last_name, id: obj.manager_id });
      }
    });
    rolesArr.forEach((obj) => {
      roleTitles.push(obj.title);
    });
    managersArr.push({ 'last name': 'self', id: idMax + 1 });

    const managerChoices = managersArr.map((manager) => {
      return `${manager['last name']} - ID#${manager['id']}`;
    });

    const { first_name, last_name, role, manager } = await inquirer.prompt([
      {
        type: 'input',
        message: 'What is the first name of the employee you want to add?',
        name: 'first_name',
      },
      {
        type: 'input',
        message: 'What is the last name of the employee you want to add?',
        name: 'last_name',
      },
      {
        type: 'list',
        message: 'What role does this employee have?',
        name: 'role',
        choices: roleTitles,
      },
      {
        type: 'list',
        message: 'who is their manager?',
        name: 'manager',
        choices: managerChoices,
      },
    ]);

    const roleIdArr = await query(
      'SELECT role_id FROM roles WHERE title = ?',
      role
    ).catch((err) => {
      throw new Error(err);
    });
    const role_id = roleIdArr[0].role_id;
    const manager_id = managersArr[managerChoices.indexOf(manager)].id;

    const { insertId } = await query(querySql, [first_name, last_name, role_id, manager_id]).catch(
      (err) => {
        throw new Error(err);
      }
    );
    console.log('successfully added employee #', insertId);
  }

  async updateEmployeeRole() {
    const query = util.promisify(this.db.query).bind(this.db);

    const getEmployeeIdList = async () => {
        const employeeSqlArr = await query(
            `SELECT employee_id FROM employees`
          ).catch((err) => {
            throw new Error(err);
          });
        
    const idList = employeeSqlArr.map(row => {
            return parseInt(row.employee_id);
        });
    return idList.sort((a, b) => a - b);
    }

    const employeeIdList = await getEmployeeIdList();

    const getRolesList = async () => {
        const rolesArr = await query(`SELECT title FROM roles`).catch((err) => {
            throw new Error(err);
          });
        const roleTitles = [];
        rolesArr.forEach((obj) => {
            roleTitles.push(obj.title);
          });
        return roleTitles;
    }

    const rolesList = await getRolesList();

    const getUpdateInfo = async () => {
          return await inquirer.prompt([
              {
                  type: 'list',
                  message: 'Enter the id of the employee you wish to update',
                  name: 'updateId',
                  choices: employeeIdList
              },
              {
                  type: 'list',
                  message: 'enter the role you wish to move them to',
                  name: 'newRole',
                  choices: rolesList
              }
          ]).catch((err) => {throw new Error(err)});
      };
    
    const { updateId, newRole } = await getUpdateInfo();
    
    const getRoleId = async () => {
        const roleIdArr = await query(
            'SELECT role_id FROM roles WHERE title = ?',
            newRole
          ).catch((err) => {
            throw new Error(err);
          });
          const role_id = roleIdArr[0].role_id;
        return role_id;
    }
    const role_id = await getRoleId();

    const querySql = 'UPDATE employees SET role_id = ? WHERE employee_id = ?';
    await query(querySql, [role_id, updateId]).catch((err) => {throw new Error(err);})
    console.log('successfully updated to role to #', role_id);
  }
  exit() {
    console.log('goodbye!');
    process.exit(this);
  }
}

module.exports = InstructionList;
