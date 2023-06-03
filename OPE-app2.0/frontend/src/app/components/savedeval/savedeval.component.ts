import { Component } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-savedeval',
  templateUrl: './savedeval.component.html',
  styleUrls: ['./savedeval.component.css']
})
export class SavedevalComponent {

  products: any[] = [
    { id: 1, name: 'Earphone', link: 'https://www.lazada.com/' },
  ];

  constructor(private authService: AuthService, private router: Router) { }

  viewEvaluation(productId: number) {
    // Logic to view evaluation based on product ID
  }

  printEvaluation(productId: number) {
    // Logic to print evaluation based on product ID
  }

  deleteProduct(productId: number) {
    // Logic to delete product based on product ID
  }
}
