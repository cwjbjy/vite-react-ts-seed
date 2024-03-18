import { useShallow } from 'zustand/react/shallow';

import useUserStore from '@/store/user';
const User = () => {
  const { userInfo, updateUserInfo, updateAge } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      updateUserInfo: state.updateUserInfo,
      updateAge: state.updateAge,
    })),
  );

  return (
    <>
      <div>
        姓名：{userInfo.name} 年龄：{userInfo.age}
      </div>
      <button onClick={() => updateUserInfo({ name: 'lisi', age: 24 })}>更新用户</button>
      <button onClick={() => updateAge(userInfo.age + 1)}>更新年龄</button>
    </>
  );
};

export default User;
