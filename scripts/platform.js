/* 使用node方式进行文件拷贝 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import minimist from 'minimist';

const { platform } = minimist(process.argv.slice(2));

const __filenameNew = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filenameNew);

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

const clearFile = () => {
  try {
    const files = fs.readdirSync(targetPath);

    files.forEach((file) => {
      const filePath = path.join(targetPath, file);

      // 判断是否为文件夹
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        // 递归删除子文件夹
        fs.rmSync(filePath, { recursive: true });
      } else {
        // 删除文件
        fs.unlinkSync(filePath);
      }
    });

    console.log('文件删除成功');
  } catch (err) {
    console.error('无法读取文件夹:', err);
  }
};

const copyFolder = (src, dest) => {
  // 创建目标目录（如果不存在）
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }

  // 读取源目录中的所有文件和子目录
  const files = fs.readdirSync(src);

  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);

    // 如果是一个文件，则复制文件
    if (stat.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    } else if (stat.isDirectory()) {
      // 如果是一个目录，递归地复制该目录及其内容
      copyFolder(srcPath, destPath);
    }
  }
};

if (fs.existsSync(targetPath)) {
  //1. 删除
  clearFile();
}

//2. 复制
copyFolder(originPath, targetPath);

console.log('复制完成');
