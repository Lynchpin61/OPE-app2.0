import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

import { SharingService } from "src/app/services/sharing.service";
import { EmailService } from "src/app/services/email.service";

@Component({
  selector: "app-otp-enter",
  templateUrl: "./otp-enter.component.html",
  styleUrls: ["./otp-enter.component.css"],
})
export class OtpEnterComponent implements OnInit {
  otpForm!: FormGroup;

  recipient!: string;
  password!: string;
  OTP!: number;
  form!: FormGroup;

  invalidOTP: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private emailService: EmailService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      "email": string, 
      "password": string,
      "otp": number
    };
    if (state) {
      this.OTP = state.otp;
      this.recipient = state.email;
      this.password = state.password;
      console.log(`ACCESS SESSION CREDENTIALS ${this.recipient} ${this.password} ${this.OTP}`)
    } else {
      console.log("NO SESSION CREDENTIALS; Access invalid; If you see this message, it probably is because you accessed this route directly via URL.")
    }
  }

  ngOnInit(): void {
    this.otpForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      OTP: new FormControl("", [Validators.required]),
      rememberMe: new FormControl(false),
    });
  }

  otpconfirm() {
    let reqOTP: number = this.otpForm.value.OTP;

    console.log(reqOTP);
    console.log(this.OTP);
    // console.log(this.form.value);
    if (reqOTP == this.OTP) {
      console.log("OTP confirmed");
      this.authService
        .signup(
          {
            "email": this.recipient, "password": this.password,
          },
        )
        .subscribe((msg) => console.log("msg"));
      this.router.navigate(["otpsuccess"]);
    } else {
      console.log("Invalid OTP");
      this.invalidOTP = true;
    }
  }

  addShakeEffect() {
    const button = document.querySelector('button[type="submit"]');
    if (button && this.otpForm.invalid) {
      button.classList.add("shake");
      setTimeout(() => button.classList.remove("shake"), 820);
    }
  }

  resendOTP() {
    let email: string = this.recipient;
    console.log(email);

    let reqObj = {
      email: email,
    };

    let otp = 0;

    this.emailService.sendMessage(reqObj).subscribe((data: any) => {
      console.log(data);
      otp = data.otp;
      this.OTP = otp;
    });
  }
}
