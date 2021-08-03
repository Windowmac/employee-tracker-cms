const Roles = require('./Roles');
const Employees = require('./Employees');
const Departments = require('./Departments');

class InstructionList {
  constructor(database) {
    this.db = database;
    this.Roles = new Roles(database);
    this.Employees = new Employees(database);
    this.Departments = new Departments(database);
  }

  viewAllDepartments() {
    this.Departments.viewAllDepartments();
  }

  async addDepartment() {
    await this.Departments.addDepartment();
  }

  viewAllRoles() {
    this.Roles.viewAllRoles();
  }

  async addRole() {
    await this.Roles.addRole();
  }

  viewAllEmployees() {
    this.Employees.viewAllEmployees();
  }

  async addEmployee() {
    await this.Employees.addEmployee();
  }

  async updateEmployeeRole() {
    await this.Employees.updateEmployeeRole();
  }

  exit() {
    console.log('goodbye!');
    process.exit(this);
  }
}

module.exports = InstructionList;
