import { useContext } from 'react';

import VirtualList from 'rc-virtual-list';
import styled from 'styled-components';

import { MyContext } from '@/pages/context';

const MyList = () => {
  const { dataSource } = useContext(MyContext);

  return (
    <Wrapper>
      <VirtualList data={dataSource} height={380} itemHeight={71} itemKey="key">
        {(item) => (
          <Item key={item.key}>
            <div className="title">{item.dataName}</div>
            <div className="content">
              <div>日期：{item.dataDate}</div>
              <div>金额（万）：{item.dataNum}</div>
              <div>当日收益：{item.dataMoney}</div>
              <div>
                每万元产生的当日收益：
                <span className={parseFloat(item.atomMoney) > 0.7 ? 'orange' : 'blue'}>{item.atomMoney}</span>
              </div>
            </div>
          </Item>
        )}
      </VirtualList>
    </Wrapper>
  );
};

export default MyList;

const Wrapper = styled.div`
  margin-bottom: 12px;
`;

const Item = styled.div`
  border-bottom: 1px solid rgb(246, 246, 246);
  .title {
    font-size: 14px;
    color: rgb(20, 20, 20);
    line-height: 21px;
    margin-bottom: 3px;
    margin-top: 6px;
  }
  .content {
    color: rgb(92, 92, 92);
    line-height: 20px;
    font-size: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .orange {
      color: rgb(255, 72, 72);
    }
    .blue {
      color: rgb(50, 101, 208);
    }
  }
`;
