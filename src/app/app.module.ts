import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService } from './services/authentication/authentication.service';
import { MovieService } from './services/movie/movie.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthenticationService, MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
