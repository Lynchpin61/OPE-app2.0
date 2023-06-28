import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';



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

  constructor(private authService: AuthService, private router: Router) { }

  aspect_phrases: Record<string, any> = {};
  aspects: string[] = [];
  normalized_score: Record<string, any> = {};
  raw_score: Record<string, any> = {};
  top_aspects: string[] = [];
  title: string = '';
  data: any = [];
  currentAspect: string = '';
  wordcloud: Chart = {} as Chart;
  pieCharts: { [key: string]: Chart } = {};

  displayedColumns: string[] = ['position', 'aspect', 'frequency'];
  // dataSource = ELEMENT_DATA;
  dataSource: TopAspect[] = [];
  clickedRows = new Set<TopAspect>();

  showBreakdown = false;
  breakdown = {} as any;
  
  onePieChart: Chart = {} as Chart;


  async ngOnInit() {
    // post request on https://db3f1af8-9011-48a6-a4d5-1e6c9b680ae0.mock.pstmn.io/absa-dashboard
    await fetch('https://3ee0a24b-3873-40e2-add9-6046fc00aef6.mock.pstmn.io/absa-dashboard', {
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
        console.log(this.raw_score)
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


  }


  // THIS FUNCTION IS FOR TESTING ONLY; Delete it soon
  add() {
    const randomNumber = Math.round( Math.random() * this.aspects.length )
    this.data = [
      ...this.data,
      {"name": this.aspects[randomNumber], "weight": 100}
    ]
    
    // Reload wordcloud
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

    console.log(this.data)
  }

  isPositiveWord(word: string): boolean {
    return !!word.match(new RegExp(`^${this.breakdown.Positive_Word}([,.!?]+|$)`, 'i'));
  }

  isNegativeWord(word: string): boolean {
    return !!word.match(new RegExp(`^${this.breakdown.Negative_Word}([,.!?]+|$)`, 'i'));
  }

  splitSentence(sentence: string): string[] {
    return sentence.split(/\b/);
  }

  
  // Smooth Scroll to #more-details
  scrollToDetails() {
    // add delay to show animation of the scroll
    setTimeout(() => {
      const details = document.querySelector('#more-details');
      details?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }


  // Modify the subject for the aspect breakdown everytime clicked
  breakdown_aspect(row: any) {
    this.breakdown = this.normalized_score[row.aspect];
    this.currentAspect = row.aspect;
    // let positiveWord = this.breakdown['Positive_Word'];
    // let negativeWord = this.breakdown['Negative_Word'];
    // let regexPositive = new RegExp(`\\b${positiveWord}\\b`, 'gi');
    // let regexNegative = new RegExp(`\\b${negativeWord}\\b`, 'gi');

    // this.breakdown['Most_Positive_Sentence'] = this.breakdown['Most_Positive_Sentence'].replace(regexPositive, `<span class="positive">${positiveWord}</span>`);
    // this.breakdown['Most_Negative_Sentence'] = this.breakdown['Most_Negative_Sentence'].replace(regexNegative, `<span class="negative">${negativeWord}</span>`);
    // toggle showBreakdown


    // Initialize data for pie chart
    let pos_count = 0;
    let neg_count = 0;
    for (const aspect in this.raw_score) {
      pos_count = this.raw_score[aspect]['Positive'];
      neg_count = this.raw_score[aspect]['Negative'];
      console.log(pos_count, neg_count);
      // Initialize Pie Chart
      let pieChart = new Chart({
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Raw Sentiment Score',
          floating: false,
          align: 'left'
        },
        credits: {
          enabled: false
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: ['green', 'red'],
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
              distance: -50,
              filter: {
                property: 'percentage',
                operator: '>',
                value: 4
              }
            },
            showInLegend: true
          }
        },
        legend: {
          labelFormatter: function() {
            return this.name + ': ' + (this.name === 'Positive' ? 'Number of times aspect appeared in positive reviews' : 'Number of times aspect appeared in negative reviews');
          }
        },
        series: [{
            name: aspect,
            colorByPoint: true,
            data: [{
              name: 'Positive',
              y: pos_count,
              color: '#10BA5C',
              sliced: true,
              selected: false,
          }, {
              name: 'Negative',
              y: neg_count,
              color: '#FA586C'
            }]
          }] as any
        });
      this.pieCharts[aspect] = pieChart;

      // apply class more-details to secondary card for transition effects
      setTimeout(() => {
        const secondElement = document.querySelector('.second');
        secondElement?.classList.add('show');
      }, 100);
    }


    this.showBreakdown = !this.showBreakdown
    console.log(this.breakdown)
    console.log(row)

  }



}
