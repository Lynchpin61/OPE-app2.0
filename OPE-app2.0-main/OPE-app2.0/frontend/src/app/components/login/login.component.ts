import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  
  constructor(private authService: AuthService, private router: Router){
  }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();

  
  }
  
  createFormGroup(): FormGroup{
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
         Validators.minLength(7)
        ]),
      rememberMe: new FormControl(false)
    });
  }

  login(): void{
    if (this.loginForm.invalid) {
      this.addShakeEffect();
      return;
    }
    
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe();

  }

  goToSignup() {
    this.router.navigateByUrl('/signup');
  }
  
  addShakeEffect() {
    const button = document.querySelector('button[type="submit"]');
    if (button && this.loginForm.invalid) {
      button.classList.add('shake');
      setTimeout(() => button.classList.remove('shake'), 820);
    }
  }
}