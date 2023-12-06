import { useContext } from 'react';

import { Table } from 'antd';

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
  },
];

const MyTable = () => {
  const { dataSource } = useContext(MyContext);
  return <Table columns={columns} dataSource={dataSource} bordered pagination={{ pageSize: 50 }} scroll={{ y: 380 }} />;
};

export default MyTable;
