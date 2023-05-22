import { Component, OnInit} from '@angular/core';
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
  aspect_labels: string[] = [];
  sentence_list: {
    [aspectLabel: string]: {
      positive: string[],
      negative: string[]
    }
  } = {};


  constructor() {}

  ngOnInit() {

    // const sentences = {
    //   "sentences": [
    //     "The battery life on this device is impressive.",
    //     "The camera takes stunning photos in low light.",
    //     "The screen quality is excellent with vibrant colors.",
    //     "The performance of this device is incredibly fast.",
    //     "Battery performance is outstanding, lasting all day.",
    //     "The camera produces sharp and clear images.",
    //     "The screen resolution is top-notch and provides a great viewing experience.",
    //     "This device delivers exceptional performance for demanding tasks.",
    //     "The battery charges quickly and holds the charge well.",
    //     "The camera features various modes that enhance photography.",
    //     "The screen size is perfect, providing ample space for content.",
    //     "The device handles resource-intensive applications with ease.",
    //     "Battery efficiency is one of the standout features.",
    //     "The camera autofocus is quick and accurate.",
    //     "The screen brightness can be adjusted to suit any environment.",
    //     "The battery drains too quickly and needs frequent charging.",
    //     "The camera struggles in low light conditions, resulting in blurry photos.",
    //     "The screen has a noticeable color shift when viewed from certain angles.",
    //     "The device lags and experiences slowdowns during multitasking.",
    //     "Battery life is disappointing, requiring constant recharging."
    //   ]
    // }

    //  Real Lazada review data
    const sentences = {
      "sentences": [
        "Admin can reply quickly. You can get items very quickly. The headphones are as good as the rumors. wide sound, good bass Anyone who listens to music must love it very much. Thank you very much",
        "Get stuff very fast.  The pack is very good. No defects, good base products. Very good value, very nice.",
        "It's true, fast delivery, good product, no problem.",
        "Products are delivered according to the order. No flaws, reasonable price, good product quality, fast delivery, good service from the transport company.",
        "The item is really nice and it has a good quality. I didn't expect it to arrive earlier than the expected date. Surely will order soon and will recommend it to other people. Kudos to the seller. More power!",
        "Good quality product as stated in the advertisement. quality delivery package Fast delivery, exactly as specified. Tried it and it works, no problem.",
        "The items were packed neatly and shipped quickly. Good value for money. the case is much appreciated.",
        "The product is excellent when it comes to sound it is really background noise cancelling and has smooth surface in both casing and it has a long range of bluetooth connection...",
        "Very elegant, very suitable for people who like black. It's very comfortable to use. clear sound Very suitable for the price I like it very much. Great. absolutely great!! cheap and great!!"
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
    fetch('http://localhost:5000/listsentences', options)
    .then(response => response.json())
    .then(data => {
      // Handle the response data
      console.log(data);
  
      // Assign sentences for each aspect label
      this.sentence_list = data;
    })
    .catch(error => {
      console.error(error);
    });

  }
}