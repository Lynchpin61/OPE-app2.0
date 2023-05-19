import { Options } from "highcharts"

export const aspectScoreChart: Options = {

  chart: {

    type: 'bar',
    height: 100,
  },
  xAxis: {
    visible: false,
    categories: [
      'Sentiment',

    ],
  },
  yAxis: {
    visible: false,
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    series: {
      stacking: 'percent',
    } as any,
  },


};
