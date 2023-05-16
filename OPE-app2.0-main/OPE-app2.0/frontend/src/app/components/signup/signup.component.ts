import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router){
  }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
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

    this.authService.signup(this.signupForm.value).subscribe((msg) => console.log(msg));
    this.router.navigate(["login"]);
  }

  addShakeEffect() {
    const button = document.querySelector('button[type="submit"]');
    if (button && this.signupForm.invalid) {
      button.classList.add('shake');
      setTimeout(() => button.classList.remove('shake'), 820);
    }
  }
}
