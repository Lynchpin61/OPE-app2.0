import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  emailExists = true;
  backendMsg = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private emailService:EmailService,
  ){}

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

    let reqObj = {
      email:email
    }

    let otp = 0;

    this.emailService.sendMessage(reqObj).subscribe((data: any)=>{
      console.log(data);
      otp = data.otp;
      console.log(otp)

      const navigationExtras: NavigationExtras = {
        state: {
          "email": this.signupForm.value.email, 
          "password": this.signupForm.value.password,
          "otp": data.otp
        }
      };

      console.log(this.signupForm.value)

      this.router.navigate(["otp"], navigationExtras);

    });
  }

  addShakeEffect() {
    const button = document.querySelector('button[type="submit"]');
    if (button && this.signupForm.invalid) {
      button.classList.add('shake');
      setTimeout(() => button.classList.remove('shake'), 820);
    }
  }
}
