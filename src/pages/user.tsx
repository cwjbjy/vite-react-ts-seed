import { useNavigate } from 'react-router-dom';

// console.log(import.meta.env.VITE_VERSION);
// console.log(import.meta.env.VITE_BASE_URL);
// console.log(import.meta.env.VITE_GLOABL_KEY);

const User = () => {
  const navigation = useNavigate();
  return (
    <div>
      {/* 报错：因为取不到c属性 */}
      {/* {obj.b.c} */}
      user
      <button onClick={() => navigation('/manage')}>manage</button>
    </div>
  );
};

export default User;
