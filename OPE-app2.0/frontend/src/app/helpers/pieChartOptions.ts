import { Options } from 'highcharts';

export const pieChartOptions: Options = {
  chart: {
    type: 'pie',
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: true,
  },
  
}
