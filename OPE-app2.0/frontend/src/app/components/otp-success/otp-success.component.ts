import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-otp-success',
  templateUrl: './otp-success.component.html',
  styleUrls: ['./otp-success.component.css']
})
export class OtpSuccessComponent {
  constructor(private router: Router){}
  
  GoBacktoLogin(){
    this.router.navigate(["login"]);
  }
  
}
