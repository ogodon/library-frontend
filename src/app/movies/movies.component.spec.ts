import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

import { of } from 'rxjs/observable/of';

import { MoviesComponent } from './movies.component';
import { MovieService } from '../services/movie/movie.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockMovieService = {
    all: jasmine.createSpy('movieAll').and.returnValue(of([
      { id: 1, title: 'title', author: 'author', releaseYear: '1990' },
      { id: 2, title: 'title2', author: 'author2', releaseYear: '1992' }
    ])),
    delete: jasmine.createSpy('movieDelete').and.returnValue(of({}))
  };
  const mockAuthenticationService = {
    getUser: () => {
      return {
        adm: false
      };
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MoviesComponent
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: MovieService, useValue: mockMovieService }
      ],
      imports: [
        CommonModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
