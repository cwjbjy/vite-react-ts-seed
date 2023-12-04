import { useNavigate } from 'react-router-dom';

// const obj: any = {
//   a: '2',
// };

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
