import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { useLocalStorageState } from 'ahooks';
import { Divider, Input, Select, Space, Button } from 'antd';

import type { InputRef } from 'antd';

const MySelect = forwardRef(function MySelect(_props, ref) {
  const [name, setName] = useState('');
  const [selectName, setSelectName] = useState('');
  const inputRef = useRef<InputRef>(null);

  useImperativeHandle(ref, () => ({
    name: selectName,
  }));

  const [items, setItems] = useLocalStorageState<string[]>('organization', {
    defaultValue: [
      '周周宝（华夏理财固收纯债最短持有7天A款D）',
      '季季宝（招银理财鑫鼎日开三个月滚动持有）',
      '浦银理财天添利现金宝5号',
      '宁银理财天天鎏金5号D',
      '信银理财日盈象天天利42号B',
      '光大理财阳光碧乐活4号D',
    ],
  });

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (items) {
      setItems([...items, name]);
      setName('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleChange = (value: string) => {
    setSelectName(value);
  };

  return (
    <Select
      style={{ width: '100%' }}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              增加
            </Button>
          </Space>
        </>
      )}
      options={items?.map((item) => ({ label: item, value: item }))}
      onChange={handleChange}
    />
  );
});

export default MySelect;
