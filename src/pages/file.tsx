import { useLocation } from 'react-router-dom';
const File = () => {
  const { state } = useLocation();
  return <div>{state.id}</div>;
};

export default File;
