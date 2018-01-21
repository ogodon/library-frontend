import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { of } from 'rxjs/observable/of';

import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from '../services/movie/movie.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  const mockAuthenticationService = {
    getUser: () => {
      return {
        adm: false
      };
    }
  };
  const mockMovieService = {
    get: jasmine.createSpy('movieGet').and.returnValue(of({ id: 1, title: 'title', author: 'author', releaseYear: '1990' })),
    update: jasmine.createSpy('movieUpdate').and.returnValue(of({ id: 1, title: 'title', author: 'author', releaseYear: '1990' }))
  };
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const mockLocation = {
    back: jasmine.createSpy('back')
  };
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: jasmine.createSpy('get').and.returnValue('1')
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailComponent ],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
