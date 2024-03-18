import { useShallow } from 'zustand/react/shallow';

import useUserStore from '@/store/user';

const Token = () => {
  const { token, updateToken } = useUserStore(
    useShallow((state) => ({ token: state.token, updateToken: state.updateToken })),
  );

  //   const token = useUserStore((state) => state.token);

  return (
    <>
      <div>token：{token}</div>
      <button onClick={() => updateToken('23652')}>更新token</button>
    </>
  );
};

export default Token;
