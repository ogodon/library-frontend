import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from '../services/movie/movie.service';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent {

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

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
    .subscribe(() => this.router.navigate(['/movies']));
  }

}
