
const db = require('./assets/config/sqlConfig');
const inquirer = require('inquirer');
const InstructionList = require('./assets/js/InstructionList.js');
const dbInstructions = new InstructionList(db);
const parseInstructionArr = require('./assets/js/parseInstructionArr.js');

const startPrompt = async () => {
        const userInstruction = await inquirer.prompt(
            {
                type: 'list',
                name: 'instruction',
                message: 'what would you like to do?',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit']
            });

        const instructionArray = userInstruction.instruction.split(' ');
        const parsedInstruction = parseInstructionArr(instructionArray);
        await dbInstructions[parsedInstruction]();
        startPrompt();
    }


startPrompt();