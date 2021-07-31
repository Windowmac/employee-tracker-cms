
const db = require('./assets/config/sqlConfig');
const inquirer = require('inquirer');
const InstructionList = require('./assets/js/InstructionList.js');
const dbInstruction = new InstructionList(db);

const startPrompt = () => {
        inquirer.prompt(
            {
                type: 'list',
                name: 'instruction',
                message: 'what would you like to do?',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit']
            }
        ).then(answer => {dbInstruction[answer.instruction]();});
}


startPrompt();