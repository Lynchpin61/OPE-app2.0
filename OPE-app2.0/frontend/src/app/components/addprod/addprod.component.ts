import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addprod',
  templateUrl: './addprod.component.html',
  styleUrls: ['./addprod.component.css']
})
export class AddprodComponent implements OnInit{
  reviewText: string = "";
  evaluatedText: string = "";
  showResult: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  submitReview() {
    // Perform evaluation logic here
    this.evaluatedText = this.reviewText + " has been evaluated!";
    this.showResult = true;
  }
}
