import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";

@Component({
  selector: 'app-addprod',
  templateUrl: './addprod.component.html',
  styleUrls: ['./addprod.component.css']
})
export class AddprodComponent implements OnInit {
  urlText: string = "";
  evaluatedText: string = "";
  showResult: boolean = false;
  images: string[] = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Lazada_%282019%29.svg/800px-Lazada_%282019%29.svg.png?20190626132505f",
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
  ];
  currentImageIndex: number = 0;

  constructor(private router: Router) { }

  ngOnInit() {
    setInterval(() => {
      this.changeImage();
    }, 10000);
  }

  changeImage() {
    const imageElement = document.getElementById("image") as HTMLImageElement;
    if (imageElement) {
      imageElement.classList.add("fade-out");
      setTimeout(() => {
        imageElement.onload = () => {
          imageElement.classList.add("fade-in");
          imageElement.classList.remove("fade-out");
        };
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        imageElement.src = this.images[this.currentImageIndex];
      }, 500);
    }
  }

  handlePaste() {
    navigator.clipboard.readText().then((text) => {
      this.urlText = text;
    });
  }

  submitReview() {
    // Perform evaluation logic here

    console.log(this.urlText);
    const navigationExtras: NavigationExtras = {state: {url: this.urlText}};
    this.evaluatedText = this.urlText + " has been evaluated!";
    this.showResult = true;
    this.router.navigate(['prodeval'], navigationExtras);
  }
}
