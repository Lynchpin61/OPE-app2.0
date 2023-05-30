import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";


@Component({
  selector: 'app-addprod',
  templateUrl: './addprod.component.html',
  styleUrls: ['./addprod.component.css']
})
export class AddprodComponent implements OnInit{
  urlText: string = "";
  evaluatedText: string = "";
  showResult: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  submitReview() {
    // Perform evaluation logic here

    console.log(this.urlText);

    const navigationExtras: NavigationExtras = {state: {url: this.urlText}};
    this.evaluatedText = this.urlText + " has been evaluated!";
    this.showResult = true;
    this.router.navigate( ['prodeval'], navigationExtras )
  }
}
