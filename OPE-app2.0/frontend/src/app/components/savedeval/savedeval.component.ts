import { Component } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-savedeval',
  templateUrl: './savedeval.component.html',
  styleUrls: ['./savedeval.component.css']
})
export class SavedevalComponent {

  constructor(private authService: AuthService, private router: Router) { }

}
