import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    if(!this.authenticationService.getJWT()) {
      this.router.navigate(['/signin']);
    }
  }
}
