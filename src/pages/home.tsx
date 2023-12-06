import { useState } from 'react';

import { useRequest } from 'ahooks';
import { Button } from 'antd';

import { getData } from '@/apis/user';

import { MyContext } from './context';

import type { DataType } from './context';

import Bar from '@/pages/components/bar';
import Line from '@/pages/components/line';
import MyModal from '@/pages/components/modal';
import MyTable from '@/pages/components/table';

const Login = () => {
  const [isModalVisible, setModal] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([]);

  useRequest(getData, {
    onSuccess: (res) => {
      setDataSource(res.data.data);
    },
  });

  return (
    <div>
      <MyContext.Provider value={{ isModalVisible, setModal, dataSource, setDataSource }}>
        <Button onClick={() => setModal(true)} type="primary" style={{ marginBottom: 16 }}>
          新增当前日期数据
        </Button>
        <MyTable />
        <Line />
        <Bar />
        <MyModal />
      </MyContext.Provider>
    </div>
  );
};

export default Login;
