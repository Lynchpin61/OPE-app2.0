import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  emailExists = true;
  backendMsg = true;

  constructor(private authService: AuthService, private router: Router, private emailService:EmailService){
  }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    const gmailRegex = /^[\w-]+(\.[\w-]+)*@gmail\.com$/i;
    const yahooRegex = /^[\w-]+(\.[\w-]+)*@yahoo\.com$/i;
    const feuRegex = /^[\w-]+(\.[\w-]+)*@feualabang\.edu.ph$/i;
    
    return new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern(`${gmailRegex.source}|${yahooRegex.source}|${feuRegex.source}`)
      ]),
      password: new FormControl("", [
        Validators.required,
         Validators.minLength(7)
        ]),
    });
  }

  signup(): void {
    if (this.signupForm.invalid) {
      this.addShakeEffect();
      return;
    }

    let email: string = this.signupForm.value.email;
    console.log(email);

    if(!this.sendMail(email)){

    }
    else{
      this.authService.signup(this.signupForm.value).subscribe((msg) => console.log(msg));
      this.router.navigate(["login"]);
    }

  }

  addShakeEffect() {
    const button = document.querySelector('button[type="submit"]');
    if (button && this.signupForm.invalid) {
      button.classList.add('shake');
      setTimeout(() => button.classList.remove('shake'), 820);
    }
  }

  sendMail(email: string): boolean{
      alert("sending email test");
      let emailSent = false;
      let reqObj = {
        email:email
      }
      if(this.emailService.sendMessage(reqObj).subscribe((data: any)=>{
        console.log(data);
        let otp = data.otp;
        let my_mail = data.email;
        console.log(otp);
        console.log(my_mail);
      })
      ){
        emailSent = this.backendMsg;
      }

      else{
        console.log('failed signup')
      }

      return emailSent;
  }
}
