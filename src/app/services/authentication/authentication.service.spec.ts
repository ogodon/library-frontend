import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import JwtDecode from 'jwt-decode';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let mockHttp;

  beforeEach(() => {
    mockHttp = {
      post: jasmine.createSpy('post')
    };
    TestBed.configureTestingModule({
      providers: [
        AuthenticationService,
        { provide: HttpClient, useValue: mockHttp }
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));

  it('should expose a setJWT method', inject([AuthenticationService], (service: AuthenticationService) => {
    localStorage.setItem = jasmine.createSpy('setItem');
    service.setJWT('token');
    expect(localStorage.setItem).toHaveBeenCalledWith('jwt', 'token');
  }));

  it('should expose a getJWT method', inject([AuthenticationService], (service: AuthenticationService) => {
    localStorage.getItem = jasmine.createSpy('getItem');
    service.getJWT();
    expect(localStorage.getItem).toHaveBeenCalledWith('jwt');
  }));

  it('should expose a signin method', inject([AuthenticationService], (service: AuthenticationService) => {
    service.signin('email', 'password');
    expect(mockHttp.post).toHaveBeenCalled();
  }));

  it('should expose a signup method', inject([AuthenticationService], (service: AuthenticationService) => {
    service.signup('email', 'password');
    expect(mockHttp.post).toHaveBeenCalled();
  }));

  it('should expose a signout method', inject([AuthenticationService], (service: AuthenticationService) => {
    localStorage.removeItem = jasmine.createSpy('removeItem');
    service.signout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('jwt');
  }));
});
