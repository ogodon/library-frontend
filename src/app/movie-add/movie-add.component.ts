import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


import { MovieService } from '../services/movie/movie.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {

  private error;

  constructor(
    private movieService: MovieService,
    private authenticationService: AuthenticationService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.authenticationService.getUser().adm) {
      this.router.navigate(['/signin']);
    }
  }

  back() {
    this.location.back();
  }

  add(title, author, releaseYear) {
    const movie = {
      title,
      author,
      releaseYear
    };
    this.movieService.create(movie)
    .subscribe(
      () => this.router.navigate(['/movies']),
      err => this.error = 'Release Year should be a number'
    );
  }

}
