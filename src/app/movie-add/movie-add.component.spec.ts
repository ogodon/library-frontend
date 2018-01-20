import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { of } from 'rxjs/observable/of';

import { MovieAddComponent } from './movie-add.component';
import { MovieService } from '../services/movie/movie.service';
import { AuthenticationService } from '../services/authentication/authentication.service';

describe('MovieAddComponent if not connected', () => {
  let component: MovieAddComponent;
  let fixture: ComponentFixture<MovieAddComponent>;
  let mockAuthenticationService = {
    getUser: () => {
      return {
        adm: false
      };
    }
  };
  let mockMovieService = {
    create: (movie) => {
      return of(movie);
    }
  };
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let mockLocation = {
    back: jasmine.createSpy('back')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAddComponent ],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to signin route if the user is not admin', () => {
    expect(mockRouter.navigate).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/signin']);
  });
});

describe('MovieAddComponent if connected', () => {
  let component: MovieAddComponent;
  let fixture: ComponentFixture<MovieAddComponent>;
  let mockAuthenticationService = {
    getUser: () => {
      return {
        adm: true
      };
    }
  };
  let mockMovieService = {
    create: jasmine.createSpy('create').and.returnValue(of({}))
  };
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let mockLocation = {
    back: jasmine.createSpy('back')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAddComponent ],
      providers: [
        { provide: MovieService, useValue: mockMovieService },
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: Router, useValue: mockRouter },
        { provide: Location, useValue: mockLocation }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not redirect to signin route if the user is not admin', () => {
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should call location.back when calling back method', () => {
    component.back();
    expect(mockLocation.back).toHaveBeenCalled();
  });
  
  it('should call movieService.create and redirect when adding a movie', () => {
    component.add('title', 'author', '1990');
    expect(mockMovieService.create).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movies']);
  });

  it('should contain a h2 element', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Add a new movie');
  });

  it('should contain a form and 3 inputs', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('form')).toBeDefined();
    expect(compiled.querySelector('input#title')).toBeDefined();
    expect(compiled.querySelector('input#author')).toBeDefined();
    expect(compiled.querySelector('input#releaseYear')).toBeDefined();
  });

  it('should contain 2 buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button#add').textContent).toContain('Add');
    expect(compiled.querySelector('button#back').textContent).toContain('Back');
  });
});
