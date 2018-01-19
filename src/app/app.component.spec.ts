import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthenticationService } from './services/authentication/authentication.service';

describe('AppComponent', () => {
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        NavMenuComponent
      ],
      providers: [
        AuthenticationService,
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have an authenticationService defined`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.authenticationService).toBeDefined();
  }));

  it(`should router.navigate to have been called once when ngOnInit() is called without json web token`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    const debugElement = fixture.debugElement;
    const authenticationService = debugElement.injector.get(AuthenticationService);
    authenticationService.signout();

    const app = debugElement.componentInstance;
    app.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/signin']);
  }));
  
  it(`should authenticationService.getJWT to have been called once when ngOnInit() is called`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    const debugElement = fixture.debugElement;
    const authenticationService = debugElement.injector.get(AuthenticationService);
    authenticationService.setJWT('mytoken');
    const getJWTSpy = spyOn(authenticationService, 'getJWT').and.callThrough();

    const app = debugElement.componentInstance;
    app.ngOnInit();
    expect(getJWTSpy).toHaveBeenCalledTimes(1);
  }));

  it('should render a div with a top class', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    const debugElement = fixture.debugElement;
    const authenticationService = debugElement.injector.get(AuthenticationService);
    authenticationService.signout();

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.top')).toBeDefined();
  }));

  it('should render a div with a top class containing a h1 with Movies Library contained', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    const debugElement = fixture.debugElement;
    const authenticationService = debugElement.injector.get(AuthenticationService);
    authenticationService.signout();

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.top h1').textContent).toContain('Movies Library');
  }));

  it('should render a div with class global-content containining the nav menu and the router-outlet', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    const debugElement = fixture.debugElement;
    const authenticationService = debugElement.injector.get(AuthenticationService);
    authenticationService.signout();

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.global-content app-nav-menu')).toBeDefined();
    expect(compiled.querySelector('.global-content .content router-outlet')).toBeDefined();
  }));
});
