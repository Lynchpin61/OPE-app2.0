import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079},
  {position: 2, name: 'Helium', weight: 4.0026},
  {position: 3, name: 'Lithium', weight: 6.941},
  {position: 4, name: 'Beryllium', weight: 9.0122},
  {position: 5, name: 'Boron', weight: 10.811},
  {position: 6, name: 'Carbon', weight: 12.0107},
  {position: 7, name: 'Nitrogen', weight: 14.0067},
  {position: 8, name: 'Oxygen', weight: 15.9994},
  {position: 9, name: 'Fluorine', weight: 18.9984},
  {position: 10, name: 'Neon', weight: 20.1797},
];

export interface TopAspect {
  position: number,
  aspect: string,
  frequency: number
}


@Component({
  selector: 'app-savedeval',
  templateUrl: './savedeval.component.html',
  styleUrls: ['./savedeval.component.css']
})
export class SavedevalComponent implements OnInit {


  text =
        'Chapter 1. Down the Rabbit-Hole ' +
        'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: ' +
        'once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations ' +
        'in it, \'and what is the use of a book,\' thought Alice \'without pictures or conversation?\'' +
        'So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy ' +
        'and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking ' +
        'the daisies, when suddenly a White Rabbit with pink eyes ran close by her';
  lines = this.text.replace(/[():'?0-9]+/g, '').split(/[,\. ]+/g);

  constructor(private authService: AuthService, private router: Router) { }


  aspect_phrases: Record<string, any> = {};
  aspects: string[] = [];
  normalized_score: Record<string, any> = {};
  raw_score: Record<string, any> = {};
  top_aspects: string[] = [];
  title: string = '';
  data: any = [];
  wordcloud: Chart = {} as Chart;

  displayedColumns: string[] = ['position', 'aspect', 'frequency'];
  // dataSource = ELEMENT_DATA;
  dataSource: TopAspect[] = [];
  clickedRows = new Set<TopAspect>();

  showBreakdown = false;
  breakdown = {} as any;
  
  onePieChart: Chart = {} as Chart;


  async ngOnInit() {
    // post request on https://db3f1af8-9011-48a6-a4d5-1e6c9b680ae0.mock.pstmn.io/absa-dashboard
    await fetch('http://localhost:8080/absa-dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "url": "https://www.amazon.com/Nikon-COOLPIX-P1000-Digital-Camera/product-reviews/B07F5HPXK4/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews"
      })
    })
      .then(response => response.json())
      .then(data => {
        // Initialize members
        this.title = data['title'];
        this.aspect_phrases = data['aspect_phrases'];
        this.aspects = data['aspects'];
        this.normalized_score = data['normalized_score'];
        this.raw_score = data['raw_score'];
        this.top_aspects = data['top_aspects'];

        console.log(data);
      });

    // Initialize data for wordcloud
    const wordcloud_data = [];
    for (let aspect in this.raw_score) {
      wordcloud_data.push({"name": aspect, "weight": this.raw_score[aspect].Positive + this.raw_score[aspect].Negative});
      // wordcloud_data.push({"name": aspect, "weight": 5});
    }
    this.data = wordcloud_data;

    // Initialize wordcloud
    this.wordcloud = new Chart({
      chart: {
        type: 'wordcloud'
      },
      title: {
        text: '',
        floating: true,
        align: 'left'
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'wordcloud',
        data: this.data,
        name: 'Occurrences'
    }],
    });

    // Initialize data for top aspects table
    const top_aspects_data: TopAspect[] = [];
    for (const aspect in this.raw_score) {
      top_aspects_data.push({"position": 0, "aspect": aspect, "frequency": this.raw_score[aspect].Positive + this.raw_score[aspect].Negative});
    }
    top_aspects_data.sort((a, b) => (a.frequency > b.frequency) ? -1 : 1);
    for (let i = 0; i < top_aspects_data.length; i++) {
      top_aspects_data[i].position = i + 1;
    }
    this.dataSource = top_aspects_data;
    console.log(top_aspects_data)
    console.log(this.dataSource)

    // Initialize Pie Chart
    this.onePieChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Browser market shares in March, 2022',
        floating: false,
        align: 'left'
      },
      credits: {
        enabled: false
      },
      series: [{
          name: 'Brands',
          colorByPoint: true,
          data: [{
              name: 'Chrome',
              y: 74.77,
              sliced: true,
              selected: true
          },  {
              name: 'Edge',
              y: 12.82
          },  {
              name: 'Firefox',
              y: 4.63
          }, {
              name: 'Safari',
              y: 2.44
          }, {
              name: 'Internet Explorer',
              y: 2.02
          }, {
              name: 'Other',
              y: 3.28
          }]
      }] as any
    });

  }


  add() {
    this.wordcloud.addPoint(Math.floor(Math.random() * 10));
    console.log(this.data)
  }

  // Modify the subject for the aspect breakdown everytime clicked
  breakdown_aspect(row: any) {
    this.breakdown = this.normalized_score[row.aspect]
    // toggle showBreakdown
    this.showBreakdown = !this.showBreakdown
    console.log(this.breakdown)
    console.log(row)

  }



}
