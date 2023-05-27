import { Options } from "highcharts"

export const aspectScoreChart: Options = {

  chart: {

    type: 'bar',
    height: 150,
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
    enabled: true,
  },
  credits: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    },
    series: {
      stacking: 'percent',
      borderRadius: 5,
    } as any,
  },


};
