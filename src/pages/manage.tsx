import { Navigate } from 'react-router-dom';

const Manage = () => {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" replace={true} />;
  }

  return <div>manage</div>;
};

export default Manage;
