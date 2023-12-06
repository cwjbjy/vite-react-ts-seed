import { useCallback, useContext, useEffect, useRef } from 'react';

import dayjs from 'dayjs';
import * as echarts from 'echarts';
import { isEmpty } from 'lodash';

import type { DataType } from '@/pages/context';

import { MyContext } from '@/pages/context';
import useResize from '@/pages/hooks/useResize';

const Line = () => {
  const { dataSource } = useContext(MyContext);
  const domRef = useRef<HTMLDivElement>(null);

  const initial = useCallback(() => {
    if (domRef.current) {
      let echartsInstance = echarts.getInstanceByDom(domRef.current);
      if (!echartsInstance) {
        echartsInstance = echarts.init(domRef.current);
      }
      echartsInstance.clear();
      //处理数据
      const [xAxisData, seriesData] = formatter(dataSource);
      // 绘制图表
      echartsInstance.setOption({
        title: {
          text: '每万元产生的当日收益',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: 'line',
            label: {
              show: true,
              position: 'top',
            },
            data: seriesData,
          },
        ],
      });
    }
  }, [dataSource]);

  useResize(domRef);

  useEffect(() => {
    if (!isEmpty(dataSource)) initial();
  }, [dataSource, initial]);

  return <div ref={domRef} style={{ width: '100%', height: 300 }}></div>;
};

export default Line;

function formatter(list: DataType[]) {
  const date = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const newList = list.filter((item) => item.dataDate === date);
  const xAxisData = newList.map((o) => o.dataName.substring(0, 4).replace(/（.*?/g, ''));
  const seriesData = newList.map((o) => o.atomMoney);

  return [xAxisData, seriesData];
}
