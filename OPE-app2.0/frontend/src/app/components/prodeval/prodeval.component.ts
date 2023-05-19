import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { oneLineBar } from 'src/app/helpers/oneLineBar';
import { aspectScoreChart } from 'src/app/helpers/aspectScoreChart';

@Component({
  selector: 'app-prodeval',
  templateUrl: './prodeval.component.html',
  styleUrls: ['./prodeval.component.css']
})
export class ProdevalComponent implements OnInit {

  aspects: string[] = [];
  aspectCharts: { [key: string]: Chart } = {};


  constructor() {}

  ngOnInit() {

    const sentences = {
      "sentences": [
        "The battery life on this device is impressive.",
        "The camera takes stunning photos in low light.",
        "The screen quality is excellent with vibrant colors.",
        "The performance of this device is incredibly fast.",
        "Battery performance is outstanding, lasting all day.",
        "The camera produces sharp and clear images.",
        "The screen resolution is top-notch and provides a great viewing experience.",
        "This device delivers exceptional performance for demanding tasks.",
        "The battery charges quickly and holds the charge well.",
        "The camera features various modes that enhance photography.",
        "The screen size is perfect, providing ample space for content.",
        "The device handles resource-intensive applications with ease.",
        "Battery efficiency is one of the standout features.",
        "The camera autofocus is quick and accurate.",
        "The screen brightness can be adjusted to suit any environment.",
        "The battery drains too quickly and needs frequent charging.",
        "The camera struggles in low light conditions, resulting in blurry photos.",
        "The screen has a noticeable color shift when viewed from certain angles.",
        "The device lags and experiences slowdowns during multitasking.",
        "Battery life is disappointing, requiring constant recharging."
      ]
    }

    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sentences)
    };
    
    fetch('http://localhost:5000/extract-aspects', options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Handle response here
        for (const aspect in data) {
          this.aspects.push(aspect);
          const positiveCounts = data[aspect]['pos-count']
          console.log("Aspect");
          console.log(data[aspect]['neg-count']);
          const negativeCounts = data[aspect]['neg-count']
  
          const chart = new Chart({...aspectScoreChart, 
            title: {
              text: aspect.toUpperCase(),
              style: {
                color: '#1B9C85',
                fontWeight: 'bold',
                fontSize: '14px',
              },
            },
            series: [
              {
                name: 'Positive',
                type: 'bar',
                color: '#8f8',
                data: [positiveCounts]
              },
              {
                name: 'Negative',
                type: 'bar',
                color: '#f88',
                data: [negativeCounts]
              }
            ],
          })
          console.log(`BEFORE `)
          this.aspectCharts[aspect] = chart;
        }
      })
      .catch(error => {
        console.error(error);
      });

      // console.log(this.aspectCharts);

  }

}
