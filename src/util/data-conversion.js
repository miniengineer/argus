export const convertDataForChartJs = (obj) => {
  const data = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]
    }]
  };
  for (const [key, value] of Object.entries(obj)) {
    data.labels.push(key);
    data.datasets[0].data.push(value);
  }
  return data;
};

