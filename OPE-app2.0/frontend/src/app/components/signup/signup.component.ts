import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(){
  }

  ngOnInit(): void{
    this.signupForm = this.createFormGroup();

  }

  createFormGroup(): FormGroup{
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(7)]),
    });
  }


  signup(): void{
    console.log(this.signupForm.value);
  }
}
