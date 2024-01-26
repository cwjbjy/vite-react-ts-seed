/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const shell = require('shelljs');

const platform = process.argv.slice(2)[0].split('=')[1];

const joinDir = (...dir) => path.join(__dirname, ...dir);

//源资源路径
const originPath = joinDir(`../platform/${platform}`);

// 目标路径
const targetPath = joinDir('../src/app');

// 确保源目录存在
if (!fs.existsSync(originPath)) {
  console.error(`源目录 ${originPath} 不存在`);
  //程序退出
  process.exit(1);
}

if (fs.existsSync(targetPath)) {
  //1. 删除
  shell.rm('-rf', targetPath);
}

//2. 复制
shell.cp('-R', originPath, targetPath);

console.log('复制完成');
