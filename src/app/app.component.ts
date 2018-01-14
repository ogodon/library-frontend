import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor (
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // Check if connected
    this.authenticationService.whoami()
    .subscribe(
      user => console.log(user),
      err => console.log(err)
    );
  }

  title = 'app';
}
