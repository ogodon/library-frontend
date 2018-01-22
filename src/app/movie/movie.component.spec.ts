import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { of } from 'rxjs/observable/of';

import { MovieComponent } from './movie.component';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { MovieService } from '../services/movie/movie.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  const mockAuthenticationService = {
    getUser: () => {
      return {
        adm: false
      };
    }
  };
  const mockMovieService = {
    get: jasmine.createSpy('movieGet').and.returnValue(of({ id: 1, title: 'title', author: 'author', releaseYear: '1990' }))
  };
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jasmine.createSpy('get').and.returnValue('1')
      }
    }
  };
  const mockLocation = {
    back: jasmine.createSpy('back')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieComponent, MovieDetailComponent ],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Location, useValue: mockLocation }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
