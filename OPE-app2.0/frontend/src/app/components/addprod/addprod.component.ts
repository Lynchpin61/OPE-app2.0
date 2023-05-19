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
  showResult: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  submitReview() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const data = { reviewText: this.reviewText };
    this.http.post('http://localhost:5000/data', data, { headers }).subscribe({
      next: (response: any) => {
        console.log('Response from Flask app:', response);
      },
      error: (error: any) => {
        console.error('Error occurred:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }
}
