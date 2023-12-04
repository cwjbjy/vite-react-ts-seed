import { useRequest } from 'ahooks';
import { Button } from 'antd';

import { getAssetsFile } from '@/utils/share';

import { getList } from '@/apis/user';

const Login = () => {
  useRequest(getList, {
    defaultParams: [{ id: 2 }],
  });

  return (
    <div>
      登录页
      <Button type="primary">Button</Button>
      <img src={getAssetsFile('home.png')} />
    </div>
  );
};

export default Login;
