import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from '../services/movie/movie.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie;
  private error;

  constructor(
    private movieService: MovieService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    if (!this.authenticationService.getUser().adm) {
      this.router.navigate(['/signin']);
    }
  }

  back() {
    this.location.back();
  }

  save() {
    this.movieService.update(this.movie)
    .subscribe(
      () => this.back(),
      err => this.error = 'Release Year should be a number'
    );
  }

}
