import { editTimeForTooltip } from './moment-js-imitation.js';

//convert data from chrome storage
export const convertDataForChartJs = (obj) => {
  const data = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        "#4dc9f6",
        "#f67019",
        "#f53794",
        "#537bc4",
        "#acc236",
        "#166a8f",
        "#00a950",
        "#58595b",
        "#8549ba"
      ]
    }]
  };
  for (const [key, value] of Object.entries(obj)) {
    data.labels.push(key);
    data.datasets[0].data.push(value);
  }
  return data;
};

//convert data from chrome storage for chartjs tooltip using the momentjs imitation function
export const convertDataForChartJsTooltip = () => {
  const options = {
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
            console.log(tooltipItem, data);
            var label = editTimeForTooltip(data.datasets[0].data[tooltipItem.index]);
            return label;
        }
      }
    }
  }
  return options;
}
