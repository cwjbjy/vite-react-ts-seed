import { useState, useRef, useMemo, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useRequest, useSize } from 'ahooks';
import { Button, Spin } from 'antd';
import styled from 'styled-components';

import { getData } from '@/apis/user';

import { MyContext } from './context';

import type { DataType } from './context';

import { TOKEN } from '@/config/localStorage';
import { LOGIN } from '@/config/path';
import Bar from '@/pages/components/bar';
// import Line from '@/pages/components/line';
import MyList from '@/pages/components/list';
import MyModal from '@/pages/components/modal';
import MyTable from '@/pages/components/table';

const Home = () => {
  const navigation = useNavigate();
  const [isModalVisible, setModal] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const ref = useRef(null);
  const size = useSize(ref);

  const { loading } = useRequest(getData, {
    onSuccess: (res) => {
      setDataSource(res.data.data);
    },
    onError: () => {
      setDataSource([]);
    },
  });

  const smallScreen = useMemo(() => {
    if (size?.width) {
      return size?.width < 752;
    } else {
      return true;
    }
  }, [size]);

  const loginOut = useCallback(() => {
    localStorage.removeItem(TOKEN);
    navigation(LOGIN);
  }, [navigation]);

  if (!localStorage.getItem(TOKEN)) {
    return <Navigate to={LOGIN} replace />;
  }

  return (
    <Spin spinning={loading} tip="加载中..." delay={500}>
      <div ref={ref}>
        <MyContext.Provider value={{ smallScreen, isModalVisible, setModal, dataSource, setDataSource }}>
          <Header>
            <Button onClick={() => setModal(true)} type="primary">
              新增收益数据
            </Button>
            <Button type="dashed" onClick={loginOut}>
              退出登录
            </Button>
          </Header>
          {smallScreen ? <MyList /> : <MyTable />}
          {/* <Line /> */}
          <Bar />
          <MyModal />
        </MyContext.Provider>
      </div>
    </Spin>
  );
};

export default Home;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
