import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import chalk from 'chalk';
import { removeSync, copySync } from 'fs-extra/esm';
import minimist from 'minimist';

const { platform } = minimist(process.argv.slice(2));

const __filenameNew = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filenameNew);

const joinDir = (...dir) => path.join(__dirname, ...dir);

//源资源路径
const originPath = joinDir(`../platform/${platform}`);

//目标路径
const targetPath = joinDir('../src/app');

// 1.确保源目录存在
if (!fs.existsSync(originPath)) {
  console.log(chalk.red(`源目录 ${originPath} 不存在`));
  //程序退出
  process.exit(1);
}

//2.删除
try {
  removeSync(targetPath);
  console.log(chalk.green('文件删除成功'));
} catch (err) {
  console.log(chalk.red(`文件删除失败:${err}`));
  process.exit(1);
}

//2. 复制
try {
  copySync(originPath, targetPath);
  console.log(chalk.green('复制完成'));
} catch (err) {
  console.log(chalk.red(`文件复制失败:${err}`));
  process.exit(1);
}