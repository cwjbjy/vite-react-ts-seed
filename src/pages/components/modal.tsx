import { useCallback, useContext, useRef } from 'react';

import { useRequest } from 'ahooks';
import { Modal, Form, Input, message } from 'antd';
import dayjs from 'dayjs';

import { addData, getData } from '@/apis/user';

import MySelect from './select';

import { MyContext } from '@/pages/context';

const MyModal = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const selectRef = useRef<{ name: string }>(null);

  const { isModalVisible, setModal, setDataSource } = useContext(MyContext);

  const { run: getAll } = useRequest(getData, {
    manual: true,
    onSuccess: (res) => {
      setDataSource(res.data.data);
    },
  });

  const { run: add } = useRequest(addData, {
    manual: true,
    onSuccess: () => {
      getAll();
    },
  });

  const handleOk = useCallback(() => {
    const value = form.getFieldsValue();

    if (!selectRef.current?.name || !value.dataDate || !value.dataNum || !value.dataMoney) {
      messageApi.open({
        type: 'error',
        content: '请输入所有选项',
      });
      return;
    }

    const testDate = /^\d{4}-\d{2}-\d{2}$/;

    if (!testDate.test(value.dataDate)) {
      messageApi.open({
        type: 'error',
        content: '请检查日期是否正确',
      });
      return;
    }

    const testNumber = /^\d+$/;

    if (!testNumber.test(value.dataNum) || !testNumber.test(value.dataMoney)) {
      messageApi.open({
        type: 'error',
        content: '金额或当日收益请输入数字',
      });
      return;
    }

    //手动计算每万元每日收益
    value.atomMoney = (value.dataMoney / value.dataNum).toFixed(4);

    //机构名称
    value.dataName = selectRef.current?.name;

    add(value);

    setModal(false);
  }, [form, add, setModal, messageApi]);

  return (
    <>
      {contextHolder}
      <Modal
        title="添加数据"
        cancelText="取消"
        okText="确认"
        width="75vw"
        style={{ maxWidth: 520 }}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setModal(false)}
      >
        <Form name="basic" form={form} initialValues={{ dataDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD') }}>
          <Form.Item label="名称">
            <MySelect ref={selectRef} />
          </Form.Item>
          <Form.Item label="日期" name="dataDate">
            <Input />
          </Form.Item>
          <Form.Item label="金额(万)" name="dataNum">
            <Input />
          </Form.Item>
          <Form.Item label="当日收益" name="dataMoney">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyModal;
