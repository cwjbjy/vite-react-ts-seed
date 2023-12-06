import { useState, useRef, useMemo } from 'react';

import { useRequest, useSize } from 'ahooks';
import { Button, Spin } from 'antd';

import { getData } from '@/apis/user';

import { MyContext } from './context';

import type { DataType } from './context';

import Bar from '@/pages/components/bar';
import Line from '@/pages/components/line';
import MyList from '@/pages/components/list';
import MyModal from '@/pages/components/modal';
import MyTable from '@/pages/components/table';

const Login = () => {
  const [isModalVisible, setModal] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  const ref = useRef(null);
  const size = useSize(ref);

  const { loading } = useRequest(getData, {
    onSuccess: (res) => {
      setDataSource(res.data.data);
    },
  });

  const smallScreen = useMemo(() => {
    if (size?.width) {
      return size?.width < 752;
    } else {
      return true;
    }
  }, [size]);

  return (
    <Spin spinning={loading} tip="加载中...">
      <div ref={ref}>
        <MyContext.Provider value={{ isModalVisible, setModal, dataSource, setDataSource }}>
          <Button onClick={() => setModal(true)} type="primary">
            新增当前日期数据
          </Button>
          {smallScreen ? <MyList /> : <MyTable />}
          <Line />
          <Bar />
          <MyModal />
        </MyContext.Provider>
      </div>
    </Spin>
  );
};

export default Login;
