import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

import { SharingService } from "src/app/services/sharing.service";
import { EmailService } from "src/app/services/email.service";

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otpForm!: FormGroup;

  recipient!: string;
  password!: string;
  OTP!: number;

  invalidOTP: boolean = false;

  inputs!: HTMLInputElement[];


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


  ngOnInit() {
    this.otpForm = this.createFormGroup();
    const inputs = Array.from(document.querySelectorAll('input[type="number"]')) as HTMLInputElement[];
    this.inputs = inputs;
    const button = document.querySelector("button");

    if (!button) {
      return; // If the button is null, exit the function
    }

    // iterate over all inputs
    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e) => {
        // This code gets the current input element and stores it in the currentInput variable
        // This code gets the next sibling element of the current input element and stores it in the nextInput variable
        // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
        const currentInput = input,
          nextInput = input.nextElementSibling as HTMLInputElement,
          prevInput = input.previousElementSibling as HTMLInputElement;

        // if the value has more than one character then clear it
        if (currentInput.value.length > 1) {
          currentInput.value = "";
          return;
        }
        // if the next input is disabled and the current value is not empty
        // enable the next input and focus on it
        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        }

        // if the backspace key is pressed
        if (e.key === "Backspace") {
          // iterate over all inputs again
          inputs.forEach((input, index2) => {
            // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
            // and the previous element exists, set the disabled attribute on the input and focus on the previous element
            if (index1 <= index2 && prevInput) {
              input.setAttribute("disabled", "true");
              input.value = "";
              prevInput.focus();
            }
          });
        }
        // ! Buggy in Angular but not in vanilla JS
        // if all input fields are filled and do not have the disabled attribute
        // add the active class to the button; otherwise, remove the active class.
        // const isAllFieldsFilled = inputs.every((input) => input.value !== "");
        // if (isAllFieldsFilled) {
        //   button.classList.add("active");
        // } else {
        //   button.classList.remove("active");
        // }
      });
    });

    // focus the first input (which index is 0) on window load
    window.addEventListener("load", () => inputs[0].focus());
  }


  createFormGroup(): FormGroup {
    return new FormGroup({
      OTP: new FormControl("", [Validators.required]),
      rememberMe: new FormControl(false),
    });
  }

  otpconfirm() {
    let reqOTP: number;
    const inputs = this.inputs;
    let parseOTP: string = "";
    inputs.forEach((input, index1) => {
      parseOTP += input.value;
    });
    console.log(parseOTP);
    reqOTP = Number(parseOTP);

    if (reqOTP === this.OTP) {
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
      console.log(`Invalid OTP: ${reqOTP}`);
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
