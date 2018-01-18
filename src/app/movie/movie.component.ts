import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from '../services/movie/movie.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  private movie = {};

  constructor(
    private movieService: MovieService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  edit(movie) {
    this.router.navigate([`/movie/${movie.id}/update`]);
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.get(id)
    .subscribe(
      movie => this.movie = movie,
      err => console.log(err)
    );
  }

}
