import { Navigate } from 'react-router-dom';

// import useConfig from '@/ahooks/useConfig';

const Manage = () => {
  // const config = useConfig();

  // console.log(config);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" replace={true} />;
  }

  return <div>manage</div>;
};

export default Manage;
