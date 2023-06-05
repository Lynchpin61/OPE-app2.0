import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
import jsPDF from 'jspdf';
import { count } from 'rxjs';
import { aspectScoreChart } from 'src/app/helpers/aspectScoreChart';
import { donutChartOptions } from 'src/app/helpers/donutChartOptions';
import { pieChartOptions } from 'src/app/helpers/pieChartOptions';




@Component({
  selector: 'app-prodeval',
  templateUrl: './prodeval.component.html',
  styleUrls: ['./prodeval.component.css']
})



export class ProdevalComponent implements OnInit {
  
  isLoading = true;
  aspects: string[] = [];
  aspectCharts: { [key: string]: Chart } = {};
  aspect_labels: string[] = [];

  onePieChart: Chart = {} as Chart;
  aspectBreakdownPieChart: Chart = {} as Chart;
  
  sentences: any;

  aspect_list: any;
  list_sentences: any;
  absa_score: any;
  get_absa: any;
  aspect_groups: any;
  sentence_attributes: any;

  items: [string, { Positive: string[], Negative: string[] }][] = [];
  counts: [string, { 'pos-count': number, 'neg-count': number, 'pos-percent': number, 'neg-percent': number}][] = [];
  labels: [string, string[]][] = [];
  totalReviews: any = 0;
  // aspect_list: { [key: string]: string[] } = { Positive: [], Negative: [] };
  // positive_sens: string[] = [];
  // negative_sens: string[] = [];

  url:string;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation()!;
    const state = navigation.extras.state as {url: string};
    this.url = state.url;
    console.log(`${this.url}`);
  }

  async ngOnInit() {

    // Mixed sentiment
    let sentences = {
      "sentences": [
      "It works well, but sometimes the unit just turns off while in use for no reason. I make sure the unit is charged so its not that. The sound quality is fair but nothing to get excited about. ",
      "The product seems to work as intended and is operating very well but it got a bit glitchy when it was first used but after a couple of minutes it worked pretty much fine after that.",
      "the package is ok but the item it self didn't really meet my expectation, there's a glitching sounds I heard while playing a music and I don't know if the earphones were built like this or somethin",
      "Works fine. The sound quality is okay. But the battery life is not that good in terms of talk time. At 100%% charge, it always runs out of battery at the end of my hour-long meetings.",
      "fast delivery, but the both earphones has different volume, kinda fast to get empty, i love the design, but my biggest problem is when i try to close it ig the magnet is not the strong, overall its fine...",
      "I ordered it yesterday and received it today. it got wet from the rain but thankfully it didn't damage the item. the touch activated sensors do not work but maybe it's because I'm using it on an Android",
      "It's been 2 weeks since I started using this. Sound is good. Audio is clear. And I was impressed by the durability. Because I have accidentally dropped this 3x already yet until now it still functions really well. And I love that! Thank you!",
      "Delivery was so fast, I even thought I was scammed! The box is somwhat lightweight so I thought nothing was in it. even took a video for proof. Haha! But, lo and behold! The item is so beautiful! I delayed the review for a day to test the item and, I was not disappointed! The sound was quite good and crisp considering it's price. I haven't tried it outside yet but, I hope it delivers. Overall, delivery fast. Item, superb (as of now, hopefully, in the long run too!) Will definitely order again next time!",
      "The case hinge easily broke so i had to put a tape to serve as a hinge. Sound quality is muffled. The treble is dead. The connection easily interrupted and disconnects / reconnects shortly even when your phone is near you.  For its price, its definitely cheap and so is the quality. The audio prompt is in Chinese.",
      "JUNK!!!!! DON'T BUY THIS!!!!!!!  I JUST HAD IT YESTERDAY AND IT'S ALREADY SKIPPING SOUNDS. WASTE OF MY MONEY"
      ]
    }

    // // Full Negative
    // const sentences = {
    //   "sentences": [
    //     "I read in the review that the battery life is long. others said that it lasts for 2 days. When I receive the item. it is 94%% charged. Then I used the earphones for 2 minutes and right after placed it back in its casing. after 10 minutes, I checked it again it was 0%. So I charged it thinking that it had low battery. When it was fully charged, I tried to use it and within 1 minute, it is 95%% already. Very sad and dissappointing. I had bluetooth earphones before but not like this. VERY POOR QUALITY.",
    //     "one earpiece not functioning properly after first charge",
    //     "received my item this day morning, upon trying this the music keeps on cut and cut, I tried to other device but same result happen. Defective item can you please change my item. ",
    //     "Not enough base, sound like you're inside a huge container drum or can. I fully charged both earphones, left earphone only lasted for 2 hours and the other lasted for 3 hours.",
    //     "It's been 24 hours since I started using it. The connection is fine but the sound has intermittent static. You can barely hear clearly bacause of the nuisance it gives.",
    //     "One earphone is malfunction. I can't hear anything. I was already charged, but still it didn't work. I think, it was not went through a quality check before it was shipped.",
    //     "The delivery is great... The only thing I don't like is the product.. When I use it, the right piece is disconnecting and sometimes it's being delayed... Like if I'm watching/listening to something, the left piece always start ahead while the right piece will wait about 1 - 2 seconds to play the audio... ",
    //     "It has not been a month since I encounter sound stuttering in both ear it happens quite a lot actually, then after a few weeks, the left ear just died on me, not having any sound but still connecting to the other one. Well it is to be expected from its price range, but still hoped I get to use it much longer. WILL NOT ORDER AGAIN.",
    //     "you should not trust this product, firstly the charging case is easily to drain, the battery of the charging doesn't last long so you should trust me and don't buy this product unless you want a defective earbuds it's not worth any money. there are other brands out there skip this one trust me you'll be disappointed if you buy this.",
    //     "bought the earphones to help me mask my tinnitus, I woke up one day to learn that the ringing in my ears worsened and I feel something uncomfortable in my left ear. Turns out the earphones emit loud noises when low battery, no matter the volume of your earphone. Thanks a lot, now I hear loud constant ringing in my head. No matter how loud the place is"
    //   ]
    // }

    await fetch('http://127.0.0.1:3000/crawl/url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({url: this.url})
    })
    .then(response => response.json())
    .then(async data => {
      // console.log(data);
      this.sentences = data;

      // translate 

      // Map the data to only get the review and not include empty reviews text
      sentences = { "sentences": []}
      for (let i = 0; i < data.length; i++) {
        if (data[i].review != "") {
          sentences["sentences"].push(data[i].review);
        }
      }
      console.log(sentences)


      // Translate the sentences
      await fetch('http://127.0.0.1:3000/translate/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "texts": sentences["sentences"] })
      })
      .then(response => response.json())
      .then(data => {        
        console.log("Translating...")
        // console.log(data);
        sentences["sentences"] = data.map( (objTranslate: { translations: { text: any; }[]; }) => objTranslate.translations[0].text );
        console.log(sentences);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      // end of translation

    })
    .catch((error) => {
      console.error('Error:', error);
    });


    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sentences)
    };
    

    await fetch('http://localhost:5000/init-dashboard', options)
    .then(response => response.json())
    .then(data => {
        this.absa_score = data.get_absa;
        console.log(this.absa_score);

        this.sentence_attributes = data.sentence_attributes;
        console.log(this.sentence_attributes);
        this.totalReviews = this.sentence_attributes.length;

        //Aspect Labels and Aspects (keywords)
        this.aspect_groups = data.get_aspect_groups;
        console.log(this.aspect_groups);
        this.labels = Object.entries(this.aspect_groups);
        for (const [key, value] of this.labels) {
          // console.log(key); // Output: The key
          // console.log(value); // Output: The value
          const typedLabel = { key: key, value: value };
          console.log(typedLabel.key);
        }


        this.aspect_list = data.get_list_sentences;
        console.log(this.aspect_list);
        console.log(Object.values(this.aspect_list));
        this.items = Object.entries(this.aspect_list);
        // const posArray: string[] = [];
        // const negArray: string[] = [];
        for (const [key, value] of this.items) {
          console.log(key); // Output: The key
          console.log(value); // Output: The value

          const typedValue = value as { Positive: string[], Negative: string[] };

          console.log(typedValue.Positive);
            // Populate posArray with elements from the Positive array
            // The (...) part is a spread operator used to push the elements of the array 
            // rather than the whole array itself
          // posArray.push(...typedValue.Positive);
          // negArray.push(...typedValue.Negative);
          // console.log(posArray);
          // console.log(negArray);
        }
        console.log(this.items)

        //COUNTS TABLE
        this.list_sentences = data.get_count_sentiments;
        console.log(this.list_sentences);
        this.counts = Object.entries(this.list_sentences);
        for (const [key, value] of this.counts) {
          console.log(key); // Output: The key
          console.log(value); // Output: The value

          const countValue = value as { 'pos-count': number, 'neg-count': number, 'pos-percent': number, 'neg-percent': number };
        }
        this.get_absa = data.get_absa;
        console.log(this.get_absa);

        //ASPECTS CHART
        console.log(this.list_sentences);
        for (const aspect in this.list_sentences) {
          this.aspects.push(aspect);
          const positiveCounts = this.list_sentences[aspect]['pos-count']
          console.log("Aspect");
          console.log(this.list_sentences[aspect]['neg-count']);
          const negativeCounts = this.list_sentences[aspect]['neg-count']

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

        // OVERALL SENTIMENT CHART
        let totalPositive = 0;
        let totalNegative = 0;
        for (const aspect in this.list_sentences) {
          totalPositive += this.list_sentences[aspect]['pos-count'];
          totalNegative += this.list_sentences[aspect]['neg-count'];
        }

        this.onePieChart = new Chart(
          {...pieChartOptions,
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true
              }
            },
            title: {
              text: 'Overall Sentiment',
              align: 'center'
            },
            series: [{
              name: 'Sentiment',
              type: 'pie',
              data: [
                { name: 'Positive', y: totalPositive, color: '#00FF00' },
                { name: 'Negative', y: totalNegative, color: '#ff0000' },
              ],
            }]
          }
        );

        // ASPECT BREAKDOWN CHART
        let aspectBreakdown: {[key: string]: { name: string; y: any; color: string; }} = {};
        for (const aspect in this.list_sentences) {
          let totalCount = this.list_sentences[aspect]['pos-count'] + this.list_sentences[aspect]['neg-count'];
          const sentiment_label = this.get_absa[aspect]["sentiment_label"];
          let color;
          if (sentiment_label === 'Positive') {
            color = '#00FF00';
          } else if (sentiment_label === "Neutral") {
            color = '#FFFF00';
          } else {
            color = '#ff0000';
          }
          aspectBreakdown[aspect] = { name: aspect, y: totalCount, color: color };
        }

        this.aspectBreakdownPieChart = new Chart(
          {
            ...donutChartOptions,
            plotOptions: {
              pie: {
                innerSize: '99%',
                borderWidth: 40,
                borderColor: undefined,
                slicedOffset: 20,
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
              },
            },
            subtitle: {
              useHTML: true,
              text: `<p style="font-size: 80px; text-align: center;">${this.totalReviews}</p>
              <span style="font-size: 22px">
                Total Reviews
              </span>`,
              floating: true,
              verticalAlign: 'middle',
              y: 30
            },
            title: {
              text: 'Aspect Breakdown',
              align: 'center'
            },
            series: [{
              name: 'Composition',
              type: 'pie',
              data: Object.values(aspectBreakdown),
            }]
          }
        );


      });


      // fetch('http://localhost:5000/sentence-attributes', options)
      // .then(response => response.json())
      // .then(data => {
      //   this.sentence_attributes = data;
      //   console.log(this.sentence_attributes);
      // });
    this.isLoading = false;
  }
    @ViewChild('HTMLpage', { static: false })
  public HTMLpage!: ElementRef; 

  makePDF() {
    let pdf = new jsPDF('p', 'in', 'a4');

    pdf.html(this.HTMLpage.nativeElement, {
      callback: (pdf) => {
        //save pdf
        pdf.save('evaluation.pdf');
      }
    })
  }
}
