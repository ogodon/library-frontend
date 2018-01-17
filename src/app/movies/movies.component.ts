import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MovieService } from '../services/movie/movie.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  private movies = [];

  constructor(
    private movieService: MovieService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.movieService.all()
    .subscribe(
      movies => this.movies = movies,
      err => console.log(err)
    );
  }

  delete(movie) {
    this.movieService.delete(movie)
    .subscribe(
      () => {
        this.getMovies();
      }
    );
  }

}
