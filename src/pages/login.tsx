import { useNavigate } from 'react-router-dom';

import { Button } from 'antd';

const Login = () => {
  const navigation = useNavigate();
  return (
    <div>
      <Button type="primary" onClick={() => navigation('/user')}>
        登录
      </Button>
    </div>
  );
};

export default Login;
