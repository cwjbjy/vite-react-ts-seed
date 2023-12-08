import { useNavigate } from 'react-router-dom';

import { useRequest } from 'ahooks';
import { Button, Form, Input, message } from 'antd';
import styled from 'styled-components';

import { login } from '@/apis/user';

import { TOKEN } from '@/config/localStorage';

type FieldType = {
  username: string;
};

const Login = () => {
  const navigation = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { run } = useRequest(login, {
    manual: true,
    onSuccess: () => {
      navigation('/');
    },
    onError: () => {
      messageApi.open({
        type: 'error',
        content: '用户名已存在',
      });
    },
  });

  const onFinish = (value: FieldType) => {
    run({ username: value.username });
    localStorage.setItem(TOKEN, value.username);
  };

  return (
    <Wrapper>
      {contextHolder}
      <Form
        name="basic"
        style={{ maxWidth: 300 }}
        onFinish={onFinish}
        layout="horizontal"
        autoComplete="off"
        size="small"
      >
        <Form.Item<FieldType> label="用户名" name="username" rules={[{ required: true, message: '请填写用户名' }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
