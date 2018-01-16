import { Component, OnInit } from '@angular/core';

import { MovieService } from '../services/movie/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  private movies = [];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.all()
    .subscribe(
      movies => this.movies = movies,
      err => console.log(err)
    );
  }

}
