import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


// export interface TopAspect {
//   position: number,
//   aspect: string,
//   frequency: number
// }

@Component({
  selector: 'app-prodeval',
  templateUrl: './prodeval.component.html',
  styleUrls: ['./prodeval.component.css'],
  providers: [DecimalPipe],
})


export class ProdevalComponent implements OnInit {

  constructor(private authService: AuthService, private router: ActivatedRoute, private decimalPipe: DecimalPipe) { }

  formatProbability(probability: number): string {
    return this.decimalPipe.transform(probability * 100, '1.2-2') + '%';
  }
  
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
  frequency: number = 0;
  posCount: number = 0;
  negCount: number = 0;
  totalCount: number = 0;
  positiveCount: number = 0;
  negativeCount: number = 0;
  positivePercent: number = 0;
  posPercent: number = 0;
  negPercent: number = 0;
  phrases_analysis: Record<string,any> = {};
  total_count: Record<string,any> = {};
  pos_aspect_phrases: any[] = [];
  neg_aspect_phrases: any[] = [];
  // pos_word_probas: any[] = [];
  // neg_word_probas: any[] = [];
  summarized_phrases: Record<string,any> = {};
  summary: string = '';
  displayedColumns: string[] = ['position', 'aspect', 'frequency'];
  // dataSource = ELEMENT_DATA;
  // dataSource: TopAspect[] = [];
  // clickedRows = new Set<TopAspect>();

  passedURL = ""

  
  onAspectClick = (aspect: string) => {
    this.currentAspect = aspect;
    this.posCount = this.raw_score[aspect]['Positive'] || 0;
    this.negCount = this.raw_score[aspect]['Negative'] || 0;
    this.positiveCount = this.total_count['Positive'];
    this.negativeCount = this.total_count['Negative'];
    // this.totalCount = this.positiveCount + this.negativeCount;
    // this.positivePercent = (this.positiveCount / this.totalCount) * 100;
    this.frequency = this.posCount + this.negCount;
    this.posPercent = this.posCount / this.frequency;
    this.negPercent = this.negCount / this.frequency;
    this.pos_aspect_phrases = this.phrases_analysis[this.currentAspect]['Positive'];
    this.neg_aspect_phrases = this.phrases_analysis[this.currentAspect]['Negative'];
    // Call the getWords function for each positive sentence and store the result in a new property
    this.pos_aspect_phrases.forEach(phrase => {
      phrase.words = this.getWords(phrase.sentence, phrase.word_proba, true);
    });

    // Call the getWords function for each negative sentence and store the result in a new property
    this.neg_aspect_phrases.forEach(phrase => {
      phrase.words = this.getWords(phrase.sentence, phrase.word_proba, true);
    });
    this.summary = this.summarized_phrases[this.currentAspect];
    // console.log(this.summary)

  }
  // onePieChart: Chart = {} as Chart;


  async ngOnInit() {

    this.router.paramMap.subscribe(params => {
      // Get state data from the route
      const state = window.history.state;

      // Check if 'url' property exists in the state object
      if (state && state.url) {
        const receivedUrl = state.url;
        this.passedURL = receivedUrl;
        console.log('Received URL:', receivedUrl);

        // Do whatever you want with the received URL
      } else {
        console.error('URL not found in state.');
      }
    });
    // post request on https://db3f1af8-9011-48a6-a4d5-1e6c9b680ae0.mock.pstmn.io/absa-dashboard
    // https://779d6a2b-7fc0-4ea4-804f-ac11ac4df044.mock.pstmn.io/absa-dashboard // craig mock server
    // await fetch('https://abb03457-0831-433b-adc9-edda95bf51e5.mock.pstmn.io/absa-dashboard', {
    await fetch('http://localhost:8080/absa-dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // "url": "https://www.amazon.com/Nikon-COOLPIX-P1000-Digital-Camera/product-reviews/B07F5HPXK4/ref=cm_cr_dp_d_show_all_btm?ie=UTF8&reviewerType=all_reviews"
        "url": this.passedURL
      })
    })
      .then(response => response.json())
      .then(data => {
        // Initialize members
        this.title = data['title'];
        this.aspect_phrases = data['aspect_phrases'];
        this.aspects = data['aspects'];
        this.summarized_phrases = data['summarized_phrases'];
        this.normalized_score = data['normalized_score'];
        this.raw_score = data['raw_score'];
        console.log(this.raw_score)
        this.top_aspects = data['top_aspects'];
        this.phrases_analysis = data['phrases_analysis'];
        this.total_count = data['total_count'];
        this.positiveCount = this.total_count['Positive'];
        this.negativeCount = this.total_count['Negative'];
        this.totalCount = this.positiveCount + this.negativeCount;
        this.positivePercent = (this.positiveCount / this.totalCount);
        console.log(this.total_count)
        console.log(this.positiveCount)
        console.log(this.negativeCount)
        console.log(this.phrases_analysis)
        console.log(this.summarized_phrases)
        console.log(data);

        this.currentAspect = this.top_aspects[0];
        this.posCount = this.raw_score[this.currentAspect]['Positive'] || 0;
        this.negCount = this.raw_score[this.currentAspect]['Negative'] || 0;
        this.frequency = this.posCount + this.negCount;
        this.posPercent = this.posCount / this.frequency;
        this.negPercent = this.negCount / this.frequency;
        this.pos_aspect_phrases = this.phrases_analysis[this.currentAspect]['Positive'];
        this.neg_aspect_phrases = this.phrases_analysis[this.currentAspect]['Negative'];
        // Call the getWords function for each positive sentence and store the result in a new property
        this.pos_aspect_phrases.forEach(phrase => {
          phrase.words = this.getWords(phrase.sentence, phrase.word_proba, true);
        });

        // Call the getWords function for each negative sentence and store the result in a new property
        this.neg_aspect_phrases.forEach(phrase => {
          phrase.words = this.getWords(phrase.sentence, phrase.word_proba, true);
        });
        this.summary = this.summarized_phrases[this.currentAspect];
        // this.totalCount = this.positiveCount + this.negativeCount;
        // this.positivePercent = this.positiveCount / this.totalCount;
        // console.log(this.summary)
        // console.log(this.pos_word_probas);
        // console.log(this.neg_word_probas);

        // Initialize data for pie chart
        let pos_count = 0;
        let neg_count = 0;
        let frequency = 0;
        for (const aspect in this.raw_score) {
          pos_count = this.raw_score[aspect]['Positive'];
          neg_count = this.raw_score[aspect]['Negative'];
          frequency = pos_count + neg_count;
          console.log(pos_count, neg_count);
          // Initialize Pie Chart
          let pieChart = new Chart({
            chart: {
              // renderTo: 'pieChart',
              backgroundColor: 'rgba(255, 255, 255, 0.0)',
              type: 'pie',
            },
            title: {
              text: '',
              floating: true,
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
        }

        

      });

      

    }

    getWords(sentence: string, word: string, highlight: boolean): { text: string; highlight: boolean }[] {
      const words = sentence.split(/(\W+)/);
      return words.map(w => ({
        text: w,
        highlight: highlight && w.toLowerCase() === word.toLowerCase()
      }));
    }
    
    
    
    
    
    
}
