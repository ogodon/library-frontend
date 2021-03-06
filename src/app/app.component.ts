import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authenticationService.getJWT()) {
      setTimeout(() => {
        if (!['/signin', '/signup'].includes(this.router.url)) {
          this.router.navigate(['/signin']);
        }
      }, 0);
    }
  }
}
