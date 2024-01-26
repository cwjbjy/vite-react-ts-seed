import { useEffect } from 'react';

const Login = () => {
  useEffect(() => {
    fetch(`/config/${import.meta.env.VITE_VERSION}.json`)
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('config', JSON.stringify(res));
      });
  }, []);

  return <div>登录页</div>;
};

export default Login;
