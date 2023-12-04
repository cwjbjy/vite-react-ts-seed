import { useCallback } from 'react';

import useUserStore from '@/store/user';

const Info = () => {
  const { userInfo, token, updateUserInfo, updateAge, updateToken } = useUserStore();

  const hanlderUser = useCallback(() => {
    updateUserInfo({ name: 'lisi', age: 24 });
  }, [updateUserInfo]);

  const handlerAge = useCallback(() => {
    updateAge(userInfo.age + 1);
  }, [updateAge, userInfo.age]);

  const handlerToken = useCallback(() => {
    updateToken('23652');
  }, [updateToken]);

  return (
    <div className="App">
      <div>
        姓名：{userInfo.name} 年龄：{userInfo.age}
      </div>
      <div>token：{token}</div>
      <button onClick={hanlderUser}>更新用户</button>
      <button onClick={handlerAge}>更新年龄</button>
      <button onClick={handlerToken}>更新token</button>
    </div>
  );
};

export default Info;
