import { useContext } from 'react';

import { Table } from 'antd';
import styled from 'styled-components';

import { MyContext } from '@/pages/context';

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const columns: ColumnTypes[number][] = [
  {
    title: '序号',
    dataIndex: 'key',
    width: '5%',
    align: 'center',
    render: (_text, _row, index) => {
      return index + 1;
    },
  },
  {
    title: '名称',
    dataIndex: 'dataName',
    width: '30%',
  },
  {
    title: '日期',
    dataIndex: 'dataDate',
    width: '15%',
  },
  {
    title: '金额（万）',
    dataIndex: 'dataNum',
    width: '20%',
    align: 'right',
  },
  {
    title: '当日收益',
    dataIndex: 'dataMoney',
    width: '15%',
    align: 'right',
  },
  {
    title: '每万元产生的当日收益',
    dataIndex: 'atomMoney',
    width: '15%',
    align: 'right',
    render: (text: string) => {
      return (
        <span className={parseFloat(text) > 0.7 ? 'orange' : parseFloat(text) < 0 ? 'green' : 'blue'}>{text}</span>
      );
    },
  },
];

const MyTable = () => {
  const { dataSource } = useContext(MyContext);
  return (
    <Wrapper>
      <Table columns={columns} dataSource={dataSource} bordered pagination={{ pageSize: 50 }} scroll={{ y: 380 }} />
    </Wrapper>
  );
};

export default MyTable;

const Wrapper = styled.div`
  margin-top: 16px;
  .green {
    color: rgb(120, 188, 111);
  }
  .orange {
    color: rgb(255, 72, 72);
  }
  .blue {
    color: rgb(50, 101, 208);
  }
`;
