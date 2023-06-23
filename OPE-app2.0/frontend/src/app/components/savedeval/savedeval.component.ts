import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
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
  // data = [
  //     {name: 'Alice', weight: 40},
  //     {name: 'Rabbit', weight: 30},
  //     {name: 'Daisy', weight: 25},
  //     {name: 'Bank', weight: 20},
  //     {name: 'Book', weight: 15},
  //     {name: 'Picking', weight: 10},
  //     {name: 'Conversation', weight: 5},
  //     {name: 'Sister', weight: 5},
  //     {name: 'Daisies', weight: 5},
  //     {name: 'Pictures', weight: 5},
  //     {name: 'Use', weight: 5},
  //     {name: 'Pleasure', weight: 5},
  //     {name: 'Trouble', weight: 5},
  //     {name: 'Mind', weight: 5},
  //     {name: 'Stupid', weight: 5},
  //     {name: 'Hot', weight: 5},
  //     {name: 'Day', weight: 5},
  //     {name: 'Sleepy', weight: 5},
  //     {name: 'Sitting', weight: 5},
  //     {name: 'Sister', weight: 5},
  //     {name: 'Book', weight: 5},
  //     {name: 'Conversations', weight: 5},
  //     {name: 'Pictures', weight: 5},
  //     {name: 'Bank', weight: 5},
  //     {name: 'Daisy', weight: 5},
  //     {name: 'Rabbit', weight: 5},
  //     {name: 'Alice', weight: 5},
  //   ];
  
//   

  constructor(private authService: AuthService, private router: Router) { }


  aspect_phrases: Record<string, any> = {};
  aspects: string[] = [];
  normalized_score: Record<string, any> = {};
  raw_score: Record<string, any> = {};
  top_aspects: string[] = [];

  data: any = [];
  wordcloud: Chart = {} as Chart;


  async ngOnInit() {
    // post request on https://d2d4cd2e-0867-43f9-9383-c194aeb6f3ba.mock.pstmn.io/absa/analyze
    await fetch('https://d2d4cd2e-0867-43f9-9383-c194aeb6f3ba.mock.pstmn.io/absa/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "text": "This is a test text"
      })
    })
      .then(response => response.json())
      .then(data => {
        // Initialize members
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
        text: 'Wordcloud NI NIGR',
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
  }


  add() {
    this.wordcloud.addPoint(Math.floor(Math.random() * 10));
    console.log(this.data)
  }



}
