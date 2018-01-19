import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  private error;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signinSuccess(response) {
    this.authenticationService.setJWT(response.token);
    this.router.navigate(['/movies']);
  }

  signin(email, password) {
    this.authenticationService.signin(email, password)
    .subscribe(
      response => this.signinSuccess(response),
      () => this.error = 'Signin failed, the email and password do not match'
    );
  }

}
