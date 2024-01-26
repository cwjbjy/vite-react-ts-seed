import { useLocation } from 'react-router-dom';

const useConfig = () => {
  const config = localStorage.getItem('config');
  const { pathname } = useLocation();
  if (config) {
    const projectConfig = JSON.parse(config);
    return projectConfig[pathname];
  } else {
    console.error('配置文件未读取');
  }
};

export default useConfig;
