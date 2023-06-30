import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

import { SharingService } from 'src/app/services/sharing.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-otp-enter',
  templateUrl: './otp-enter.component.html',
  styleUrls: ['./otp-enter.component.css']
})
export class OtpEnterComponent implements OnInit{

  otpForm!: FormGroup;
  
  OTP!: number;
  form!: FormGroup;

  invalidOTP: boolean = false;

  
  constructor(
    private authService: AuthService,
    private router: Router,
    private emailService:EmailService,
    private sharingService: SharingService
    ){
  }


  ngOnInit(): void {
    this.otpForm = this.createFormGroup();
    this.OTP = this.sharingService.getSharedData2();
    this.form = this.sharingService.getSharedData1();
  }
  
  createFormGroup(): FormGroup{
    return new FormGroup({
      OTP: new FormControl("", [
        Validators.required
        ]),
      rememberMe: new FormControl(false)
    });
  }

  otpconfirm(){
    let reqOTP: number = this.otpForm.value.OTP
    
    console.log(reqOTP)
    console.log(this.OTP)
    console.log(this.form.value)
    if(reqOTP = this.OTP){
      this.authService.signup(this.form.value).subscribe((msg) => console.log(msg));
      this.router.navigate(["otpenter"]);
      
    }
    else{
      this.invalidOTP = true;
    }
  }

  addShakeEffect() {
    const button = document.querySelector('button[type="submit"]');
    if (button && this.otpForm.invalid) {
      button.classList.add('shake');
      setTimeout(() => button.classList.remove('shake'), 820);
    }
  }

  resendOTP(){
    let email: string = this.form.value.email;
    console.log(email);

    let reqObj = {
      email:email
    }

    let otp = 0;

    this.emailService.sendMessage(reqObj).subscribe((data: any)=>{
      console.log(data);
      otp = data.otp;
      this.updateData(this.form, otp)
    });
  }

  updateData(formvalue: FormGroup, OTP: number) {

    this.sharingService.updateSharedData(formvalue, OTP);
  }
}
