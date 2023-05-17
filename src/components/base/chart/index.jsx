import * as echarts from 'echarts';
import { useEffect, useState } from 'react';
import { basicChartOptions } from '~/global/constants';

export const BaseChart = ({ options = basicChartOptions, id , style}) => {
  let myChart = null;
  const optionsJsonString = JSON.stringify(options);
  const [count, setCount] = useState(0);

  useEffect(() => {}, []);

  useEffect(() => {
    setCount(count + 1);
    myChart = echarts.init(document.getElementById(id));
    myChart.setOption(options);
  }, [optionsJsonString]);

  return (
    <div>
      <div>
        <div id={id} style={{ width: '600px', height: '500px', ...style }}></div>
      </div>
    </div>
  );
};
