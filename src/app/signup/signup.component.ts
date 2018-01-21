import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Validator from 'validator';

import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private error;

  private user = {
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  errorMessage(): string {
    if (this.user.password !== this.user.passwordConfirmation) {
      return 'Password and password confirmation should be identical';
    }
    if (!Validator.isEmail(this.user.email)) {
      return 'Email should be valid';
    }
    if (!Validator.isLength(this.user.password.trim(), { min: 8, max: undefined })) {
      return 'Password should have at least 8 characters';
    }
    return '';
  }

  ngOnInit() {
  }

  signupSuccess(response) {
    this.authenticationService.setJWT(response.token);
    this.router.navigate(['/movies']);
  }

  signup() {
    if (this.errorMessage() !== '') {
      return;
    }
    this.authenticationService.signup(this.user.email, this.user.password)
    .subscribe(
      response => this.signupSuccess(response),
      () => this.error = 'Signup failed, the email already exists'
    );
  }

}
