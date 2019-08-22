import React from 'react';
import { Pie } from 'react-chartjs-2';
import { convertDataForChartJs, convertDataForChartJsTooltip } from './util/data-conversion.js';

function DataChart({data}) {
  console.log(data);
  return (
    <div>
      <Pie data={convertDataForChartJs(data)} options={convertDataForChartJsTooltip()} />
    </div>
  );
}

export default DataChart;
