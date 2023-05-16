import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { oneLineBar } from 'src/app/helpers/oneLineBar';

@Component({
  selector: 'app-prodeval',
  templateUrl: './prodeval.component.html',
  styleUrls: ['./prodeval.component.css']
})
export class ProdevalComponent {
  oneLineBar = new Chart(oneLineBar);
  oneLineBar3 = new Chart(oneLineBar);
  oneLineBar2 = new Chart(oneLineBar);
  oneLineBar1 = new Chart(oneLineBar);
}
