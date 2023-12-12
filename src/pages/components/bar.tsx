import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { useRequest } from 'ahooks';
import { Spin, Radio } from 'antd';
import * as echarts from 'echarts';
import { isEmpty } from 'lodash';
import PubSub from 'pubsub-js';

import { getEarnings } from '@/apis/user';

import type { DataType } from '@/pages/context';
import type { RadioChangeEvent } from 'antd';

import { UPDATEBAR } from '@/config/pubsub';
import { MyContext } from '@/pages/context';
import useResize from '@/pages/hooks/useResize';
import { handleScreen } from '@/pages/utils/index';

const Bar = () => {
  const { smallScreen } = useContext(MyContext);
  const domRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<DataType[]>([]);
  const [date, setDate] = useState('WEEK');

  const { run, loading } = useRequest(getEarnings, {
    manual: true,
    onSuccess: (res) => {
      if (!isEmpty(res.data.data)) {
        setData(res.data.data);
      }
    },
    onError: () => {
      setData([]);
    },
  });

  const initial = useCallback(() => {
    if (domRef.current) {
      let echartsInstance = echarts.getInstanceByDom(domRef.current);
      if (!echartsInstance) {
        echartsInstance = echarts.init(domRef.current);
      }
      echartsInstance.clear();
      //处理数据
      const [xAxisData, seriesData] = formatter(data);
      const options = {
        title: {
          text: '每万元每日产生的平均收益',
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
            markLine: {
              silent: true,
              lineStyle: {
                color: 'red',
              },
              data: [
                {
                  yAxis: 0.65,
                },
              ],
            },
            data: seriesData,
          },
        ],
      };
      if (smallScreen) handleScreen(options, smallScreen);
      // 绘制图表
      echartsInstance.setOption(options);
    }
  }, [data, smallScreen]);

  useResize(domRef);

  useEffect(() => {
    if (!isEmpty(data)) initial();
  }, [data, initial]);

  useEffect(() => {
    run({ date });
  }, [date, run]);

  const handleChange = (e: RadioChangeEvent) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    PubSub.subscribe(UPDATEBAR, () => {
      run({ date });
    });
    return () => {
      PubSub.unsubscribe(UPDATEBAR);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Spin spinning={loading} tip="加载中..." delay={500}>
      <div ref={domRef} style={{ width: '100%', height: 300 }}></div>
      <Radio.Group defaultValue="WEEK" buttonStyle="solid" size="small" onChange={handleChange}>
        <Radio.Button value="DAY">今天</Radio.Button>
        <Radio.Button value="WEEK">近一周</Radio.Button>
        <Radio.Button value="MONTH">近一个月</Radio.Button>
        <Radio.Button value="">购买以来</Radio.Button>
      </Radio.Group>
    </Spin>
  );
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
    const length = arr.length;
    const total = arr.reduce((res: number, cur: DataType) => (res += parseFloat(cur.atomMoney)), 0).toFixed(2);
    return {
      value: (total / length).toFixed(2),
      itemStyle: {
        color: colors[i],
      },
    };
  });
  return [xAxisData, seriesData];
}
