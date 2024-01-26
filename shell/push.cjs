/* eslint-disable @typescript-eslint/no-var-requires */
const inquirer = require('inquirer');
const shell = require('shelljs');

const exec = shell.exec;

let message = '';

function handleShell() {
  if (exec('git add .').code !== 0) {
    console.error('git add . 失败');
    process.exit(1);
  }
  if (exec(`git commit -m "${message}"`).code !== 0) {
    console.error('commit 失败');
    process.exit(1);
  }
  if (exec('git push').code !== 0) {
    console.error('git push 失败');
    process.exit(1);
  }
}

function promptModule() {
  inquirer
    .prompt({
      type: 'input',
      name: 'msg',
      message: '请输入commit提交信息，按回车确认',
    })
    .then((answers) => {
      message = answers.msg;
      handleShell();
    });
}

promptModule();
