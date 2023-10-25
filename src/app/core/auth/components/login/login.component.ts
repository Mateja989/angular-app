import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginForm : FormGroup;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      'email' : new FormControl('employer@gmail.com',[Validators.required]),
      'password' : new FormControl('EmployerPassword456',[Validators.required]),
    });
  } 


  login() {
    this.authService.login(this.loginForm.value.email,this.loginForm.value.password).subscribe(
      (result) => {
        console.log('Uspešno prijavljeni', result);
      },
      (error) => {
        console.error('Greška prilikom prijave', error);
      }
    );
  }
  
}

