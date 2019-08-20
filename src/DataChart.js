import React from 'react';
import { Pie } from 'react-chartjs-2';
import { convertDataForChartJs } from './util/data-conversion.js';

function DataChart({data}) {
  return (
    <div>
      <Pie data={convertDataForChartJs(data)} />
    </div>
  );
}

export default DataChart;