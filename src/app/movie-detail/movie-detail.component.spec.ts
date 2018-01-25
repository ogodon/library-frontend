import { Component, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { of } from 'rxjs/observable/of';

import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from '../services/movie/movie.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'test-component-wrapper',
  template: '<movie-detail [movie]="movie"></movie-detail>'
})
class TestComponentWrapper {
  product = { id: 1, title: 'title', author: 'author', releaseYear: '2000' };
}

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponentWrapper, MovieDetailComponent ],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation }
      ],
      imports: [
        FormsModule
      ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
