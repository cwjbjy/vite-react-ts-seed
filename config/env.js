import dotenv from 'dotenv';
import minimist from 'minimist';

const { _, mode } = minimist(process.argv.slice(2));

//从自定义启动参数中，提取出platform
const platform = _.filter((o) => o.includes('platform'))[0].split('=')[1];

/* 根据打包配置设置环境变量，先设置的优先级最高 */
/* 优先级：.env.platform.mode > .env.platform >  .env.local > .env */
dotenv.config({ path: process.cwd() + '/env/' + '.env.' + platform + '.' + mode, override: true });
dotenv.config({ path: process.cwd() + '/env/' + '.env.' + platform, override: true });
dotenv.config({ path: process.cwd() + '/env/' + '.env.local', override: true });
dotenv.config({ path: process.cwd() + '/env/' + '.env', override: true });
