import dotenv from 'dotenv';
import minimist from 'minimist';

const { _, mode } = minimist(process.argv.slice(2));

//从自定义启动参数中，提取出platform
const platform = _.filter((o) => o.includes('platform'))[0]?.split('=')[1] || 'wc1';

/* 根据打包配置设置环境变量，先设置的优先级最高 */
/* 优先级： .env.local > .env.platform.mode > .env.platform > .env */
dotenv.config({ path: process.cwd() + '/env/' + '.env.local' });
dotenv.config({ path: process.cwd() + '/env/' + '.env.' + platform + '.' + mode });
dotenv.config({ path: process.cwd() + '/env/' + '.env.' + platform });
dotenv.config({ path: process.cwd() + '/env/' + '.env' });
