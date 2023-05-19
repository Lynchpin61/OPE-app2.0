import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-addprod',
  templateUrl: './addprod.component.html',
  styleUrls: ['./addprod.component.css']
})
export class AddprodComponent implements OnInit{
  reviewText: string = "";
  evaluatedText: string = "";
  showResult: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    
  }

  submitReview() {
    // Perform evaluation logic here
    this.evaluatedText = this.reviewText + " has been evaluated!";
    this.showResult = true;
    this.router.navigate(['prodeval'])
  }
}
