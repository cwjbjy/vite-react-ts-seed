import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filenameNew = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filenameNew);

// 开发环境 router 文件路径
export const routerPath = '../../src/router/dev.routerConfig.tsx';

// 实际业务中的所有模块
export const routerModuleConfig = fs
  .readdirSync(path.resolve(__dirname, '../../src/router'))
  .map((item) => item.replace(/(.*)\.[jt]sx?$/, '$1'))
  .filter((file) => !['index', 'routes', 'dev.routerConfig'].includes(file));
