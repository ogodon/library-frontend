import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { MovieService } from './movie.service';
import { AuthenticationService } from '../authentication/authentication.service';

describe('MovieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService,
        AuthenticationService
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([MovieService], (service: MovieService) => {
    expect(service).toBeTruthy();
  }));
});
