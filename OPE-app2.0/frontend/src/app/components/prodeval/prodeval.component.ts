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
  sentences: any;

  aspect_list: any;

  list_sentences: any;
  


  constructor() {}

  ngOnInit() {

    // // Mixed sentiment
    // const sentences = {
    //   "sentences": [
    //   "It works well, but sometimes the unit just turns off while in use for no reason. I make sure the unit is charged so its not that. The sound quality is fair but nothing to get excited about. ",
    //   "The product seems to work as intended and is operating very well but it got a bit glitchy when it was first used but after a couple of minutes it worked pretty much fine after that.",
    //   "the package is ok but the item it self didn't really meet my expectation, there's a glitching sounds I heard while playing a music and I don't know if the earphones were built like this or somethin",
    //   "Works fine. The sound quality is okay. But the battery life is not that good in terms of talk time. At 100%% charge, it always runs out of battery at the end of my hour-long meetings.",
    //   "fast delivery, but the both earphones has different volume, kinda fast to get empty, i love the design, but my biggest problem is when i try to close it ig the magnet is not the strong, overall its fine...",
    //   "I ordered it yesterday and received it today. it got wet from the rain but thankfully it didn't damage the item. the touch activated sensors do not work but maybe it's because I'm using it on an Android",
    //   "It's been 2 weeks since I started using this. Sound is good. Audio is clear. And I was impressed by the durability. Because I have accidentally dropped this 3x already yet until now it still functions really well. And I love that! Thank you!",
    //   "Delivery was so fast, I even thought I was scammed! The box is somwhat lightweight so I thought nothing was in it. even took a video for proof. Haha! But, lo and behold! The item is so beautiful! I delayed the review for a day to test the item and, I was not disappointed! The sound was quite good and crisp considering it's price. I haven't tried it outside yet but, I hope it delivers. Overall, delivery fast. Item, superb (as of now, hopefully, in the long run too!) Will definitely order again next time!",
    //   "The case hinge easily broke so i had to put a tape to serve as a hinge. Sound quality is muffled. The treble is dead. The connection easily interrupted and disconnects / reconnects shortly even when your phone is near you.  For its price, its definitely cheap and so is the quality. The audio prompt is in Chinese.",
    //   "JUNK!!!!! DON'T BUY THIS!!!!!!!  I JUST HAD IT YESTERDAY AND IT'S ALREADY SKIPPING SOUNDS. WASTE OF MY MONEY"
    //   ]
    // }

    // Full Negative
    const sentences = {
      "sentences": [
        "I read in the review that the battery life is long. others said that it lasts for 2 days. When I receive the item. it is 94%% charged. Then I used the earphones for 2 minutes and right after placed it back in its casing. after 10 minutes, I checked it again it was 0%. So I charged it thinking that it had low battery. When it was fully charged, I tried to use it and within 1 minute, it is 95%% already. Very sad and dissappointing. I had bluetooth earphones before but not like this. VERY POOR QUALITY.",
        "one earpiece not functioning properly after first charge",
        "received my item this day morning, upon trying this the music keeps on cut and cut, I tried to other device but same result happen. Defective item can you please change my item. ",
        "Not enough base, sound like you're inside a huge container drum or can. I fully charged both earphones, left earphone only lasted for 2 hours and the other lasted for 3 hours.",
        "It's been 24 hours since I started using it. The connection is fine but the sound has intermittent static. You can barely hear clearly bacause of the nuisance it gives.",
        "One earphone is malfunction. I can't hear anything. I was already charged, but still it didn't work. I think, it was not went through a quality check before it was shipped.",
        "The delivery is great... The only thing I don't like is the product.. When I use it, the right piece is disconnecting and sometimes it's being delayed... Like if I'm watching/listening to something, the left piece always start ahead while the right piece will wait about 1 - 2 seconds to play the audio... ",
        "It has not been a month since I encounter sound stuttering in both ear it happens quite a lot actually, then after a few weeks, the left ear just died on me, not having any sound but still connecting to the other one. Well it is to be expected from its price range, but still hoped I get to use it much longer. WILL NOT ORDER AGAIN.",
        "you should not trust this product, firstly the charging case is easily to drain, the battery of the charging doesn't last long so you should trust me and don't buy this product unless you want a defective earbuds it's not worth any money. there are other brands out there skip this one trust me you'll be disappointed if you buy this.",
        "bought the earphones to help me mask my tinnitus, I woke up one day to learn that the ringing in my ears worsened and I feel something uncomfortable in my left ear. Turns out the earphones emit loud noises when low battery, no matter the volume of your earphone. Thanks a lot, now I hear loud constant ringing in my head. No matter how loud the place is"
      ]
    }


    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sentences)
    };
    
    fetch('http://localhost:5000/count-sentiments', options)
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
    fetch('http://localhost:5000/count-sentiments', options)
      .then(response => response.json())
      .then(data => {
          this.aspect_list = data;
          console.log(this.aspect_list);});


    fetch('http://localhost:5000/list-sentences', options)
      .then(response => response.json())
      .then(data => {
          this.list_sentences = data;
          console.log(this.list_sentences);});
  }
}