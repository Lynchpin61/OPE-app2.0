import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addprod',
  templateUrl: './addprod.component.html',
  styleUrls: ['./addprod.component.css']
})
export class AddprodComponent implements OnInit {
  reviewText: string = "";
  evaluatedText: string = "";
  sentimentText: string = "";
  showResult: boolean = false;
  showResult2: boolean = false;
  input2: string = "";
  sentimentClass: string = "";

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  submitReview() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // const data = { reviewText: this.reviewText };
    const data = { "sentences": [
      "The battery life on this device is impressive.",
      "The camera takes stunning photos in low light.",
      "The screen quality is excellent with vibrant colors."
  ] };
    this.http.post('http://localhost:5000/extract-aspects', data, { headers }).subscribe({
      next: (response: any) => {
        console.log('Response from Flask app:', JSON.stringify(data));
      },
      error: (error: any) => {
        console.error('Error occurred:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });

    fetch('http://localhost:5000/aspects').then(response => {
      response.json().then(data => {
        this.evaluatedText = JSON.stringify(data);
        console.log(data);
        this.showResult = true;
      });
    });
  }

  submitForm2() {
    console.log("submitForm2 " + this.input2);
    let data = { "sentence": this.input2 };
    
    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
  
    fetch('http://localhost:5000/sentiment', options)
      .then(response => response.json())
      .then(data => {
        const [sentence, sentiment] = data[0];
        console.log(data);
        // Handle response here
        this.sentimentText = "Sentence: " + sentence;
        this.sentimentClass = " Sentiment: " + sentiment;
        this.showResult2 = true;
      })
      .catch(error => {
        console.error(error);
        // Handle error here
      });
  }
}