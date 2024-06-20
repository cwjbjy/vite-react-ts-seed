/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process');

const inquirer = require('inquirer');

function promptModule() {
  inquirer
    .prompt([
      {
        name: 'type',
        type: 'list',
        message: '选择提交类型:',
        choices: [
          {
            name: 'feat',
            value: 'feat',
          },
          {
            name: 'bug',
            value: 'bug',
          },
        ],
      },
      {
        type: 'input',
        name: 'msg',
        message: '请输入commit提交信息，按回车确认',
      },
    ])
    .then(({ msg, type }) => {
      execSync('git add .');
      execSync(`git commit -m "${type}: ${msg}"`);
      execSync('git push');
    });
}

promptModule();
