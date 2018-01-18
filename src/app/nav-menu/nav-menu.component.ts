import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  goto(location) {
    this.router.navigate([location]);
  }

  signout() {
    this.authenticationService.signout();
    this.router.navigate(['/signin']);
  }

}
