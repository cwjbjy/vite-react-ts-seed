import { useCallback, useContext, useEffect, useRef } from 'react';

import * as echarts from 'echarts';
import { isEmpty } from 'lodash';

import type { DataType } from '@/pages/context';

import { MyContext } from '@/pages/context';
import useResize from '@/pages/hooks/useResize';

const Bar = () => {
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
          text: '2023-12-04起每万元产生的收益总额',
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
            type: 'bar',
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

export default Bar;

const colors = ['#006EFF', '#1A8EFF', '#4CA7FF', '#8DC7FF', '#C3E2FF', '#91E1DA', '#B7FFE2', '#6AF2DA', '#56DFFF'];

function formatter(list: DataType[]) {
  const object: any = {};
  list.forEach((item) => {
    object[item.dataName] = object[item.dataName] || [];
    object[item.dataName].push(item);
  });
  const keys = Object.keys(object);
  const xAxisData = keys.map((o) => o.substring(0, 4).replace(/（.*?/g, ''));
  const seriesData = keys.map((o, i) => {
    const arr = object[o];
    const total = arr.reduce((res: number, cur: DataType) => (res += parseFloat(cur.atomMoney)), 0).toFixed(2);
    return {
      value: total,
      itemStyle: {
        color: colors[i],
      },
    };
  });
  return [xAxisData, seriesData];
}
